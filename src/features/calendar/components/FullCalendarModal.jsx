import { useEffect, useMemo, useState } from "react";

function toISODate(date) {
  return date.toISOString().split("T")[0];
}

function formatMonthTitle(date) {
  return date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

function formatDateLabel(date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function FullCalendarModal({
  entries,
  onClose,
  onOpenDayDetails,
}) {
  const currentRealDate = new Date();
  const firstAllowedMonth = new Date(currentRealDate.getFullYear(), 0, 1);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(currentRealDate.getFullYear(), currentRealDate.getMonth(), 1)
  );

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startOffset = firstDay.getDay();

  const days = useMemo(() => {
    const results = [];

    for (let i = 0; i < startOffset; i += 1) {
      results.push(null);
    }

    for (let i = 1; i <= daysInMonth; i += 1) {
      const date = new Date(year, month, i);
      const iso = toISODate(date);

      const entry = entries?.[iso];
      const tasks = Object.values(entry?.hardTasks || {});
      const total = tasks.length;
      const completed = tasks.filter((task) => task.completed).length;
      const progress = total ? completed / total : 0;
      const isComplete = total > 0 && completed === total;
      const isToday = iso === toISODate(currentRealDate);

      results.push({
        date,
        iso,
        label: formatDateLabel(date),
        day: i,
        progress,
        isComplete,
        isToday,
      });
    }

    return results;
  }, [daysInMonth, entries, month, year]);

  const canGoBack =
    currentMonth.getFullYear() > firstAllowedMonth.getFullYear() ||
    (currentMonth.getFullYear() === firstAllowedMonth.getFullYear() &&
      currentMonth.getMonth() > firstAllowedMonth.getMonth());

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="calendar-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="calendar-modal__header">
          <button
            type="button"
            className="calendar-modal__nav-button"
            onClick={() =>
              canGoBack &&
              setCurrentMonth(new Date(year, month - 1, 1))
            }
            disabled={!canGoBack}
          >
            ←
          </button>

          <h2 className="calendar-modal__title">
            {formatMonthTitle(currentMonth)}
          </h2>

          <button
            type="button"
            className="calendar-modal__nav-button"
            onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
          >
            →
          </button>
        </div>

        <div className="calendar-modal__weekday-row">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => (
            <span key={label} className="calendar-modal__weekday">
              {label}
            </span>
          ))}
        </div>

        <div className="calendar-grid">
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="calendar-day calendar-day--empty" />;
            }

            return (
              <button
                key={day.iso}
                type="button"
                className={[
                  "calendar-day",
                  day.isToday ? "calendar-day--today" : "",
                  day.isComplete ? "calendar-day--complete" : "",
                ]
                  .join(" ")
                  .trim()}
                onClick={() => onOpenDayDetails(day.iso, day.label)}
              >
                <span className="calendar-day__number">{day.day}</span>
                <div className="mini-ring">
                  <div
                    className="mini-ring-fill"
                    style={{ width: `${day.progress * 100}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}