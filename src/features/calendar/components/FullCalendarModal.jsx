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
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
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

  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];

    // PREVIOUS MONTH DAYS
    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day);

      days.push({
        date,
        iso: toISODate(date),
        day,
        isCurrentMonth: false,
      });
    }

    // CURRENT MONTH DAYS
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);

      days.push({
        date,
        iso: toISODate(date),
        day: i,
        isCurrentMonth: true,
      });
    }

    // NEXT MONTH DAYS (fill grid to 42 cells)
    const remaining = 42 - days.length;

    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);

      days.push({
        date,
        iso: toISODate(date),
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month]);

  function getProgress(dayIso) {
    const entry = entries?.[dayIso];
    if (!entry) return 0;

    const tasks = Object.values(entry.hardTasks || {});
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;

    return total ? completed / total : 0;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="calendar-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="calendar-modal__header">
          <button
            onClick={() =>
              setCurrentMonth(new Date(year, month - 1, 1))
            }
            className="calendar-modal__nav-button"
          >
            ←
          </button>

          <h2 className="calendar-modal__title">
            {formatMonthTitle(currentMonth)}
          </h2>

          <button
            onClick={() =>
              setCurrentMonth(new Date(year, month + 1, 1))
            }
            className="calendar-modal__nav-button"
          >
            →
          </button>
        </div>

        <div className="calendar-modal__weekday-row">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            const progress = getProgress(day.iso);
            const isToday =
              day.iso === toISODate(new Date());

            return (
              <button
                key={index}
                className={`calendar-day ${
                  !day.isCurrentMonth ? "calendar-day--faded" : ""
                } ${isToday ? "calendar-day--today" : ""}`}
                onClick={() =>
                  onOpenDayDetails(day.iso, formatDateLabel(day.date))
                }
              >
                <span>{day.day}</span>

                <div className="mini-ring">
                  <div
                    className="mini-ring-fill"
                    style={{ width: `${progress * 100}%` }}
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