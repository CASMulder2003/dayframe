import { getWeekFromDate } from "../../../lib/date";
import ProgressRing from "../../../components/ui/ProgressRing";

export default function WeekCalendar({
  baseDate,
  selectedDateISO,
  todayISO,
  onSelectDay,
  setWeekOffset,
  weekOffset,
  entries,
  onOpenFullCalendar,
}) {
  const week = getWeekFromDate(baseDate);

  function getProgress(dayIso) {
    const entry = entries?.[dayIso];
    if (!entry) return 0;

    const tasks = Object.values(entry.hardTasks || {});
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;

    return total ? completed / total : 0;
  }

  function goPrevWeek() {
    setWeekOffset((prev) => Math.max(prev - 1, -1));
  }

  function goNextWeek() {
    setWeekOffset((prev) => Math.min(prev + 1, 1));
  }

  function getTitle() {
    if (weekOffset === -1) return "Previous Week";
    if (weekOffset === 1) return "Next Week";
    return "This Week";
  }

  return (
    <section className="calendar-card">
      <div className="calendar-card__header calendar-header-flex">
        <div>
          <p className="eyebrow">Week View</p>
          <h2 className="section-title">{getTitle()}</h2>
        </div>

        <div className="calendar-controls">
          <button
            type="button"
            disabled={weekOffset === -1}
            onClick={goPrevWeek}
            className="calendar-control-button"
          >
            ←
          </button>

          <button
            type="button"
            disabled={weekOffset === 1}
            onClick={goNextWeek}
            className="calendar-control-button"
          >
            →
          </button>

          <button
            type="button"
            onClick={onOpenFullCalendar}
            className="calendar-control-button"
          >
            Calendar
          </button>
        </div>
      </div>

      <div className="week-calendar">
        {week.map((day) => {
          const isSelected = day.iso === selectedDateISO;
          const isToday = day.iso === todayISO;
          const progress = getProgress(day.iso);

          return (
            <button
              key={day.iso}
              type="button"
              className={`week-day ${
                isSelected ? "week-day--selected" : ""
              } ${isToday ? "week-day--today" : ""}`}
              onClick={() => onSelectDay(day.iso)}
            >
              <span className="week-day__label">{day.label}</span>

              <div className="week-day__ring-wrapper">
                <ProgressRing
                  progress={progress}
                  size={48}
                  color={isSelected ? "#ffffff" : "#d84d57"}
                  trackColor={
                    isSelected
                      ? "rgba(255,255,255,0.3)"
                      : "#e4e7ef"
                  }
                />

                <span className="week-day__number">
                  {day.dayNumber}
                </span>
              </div>

              {isToday && (
                <span className="week-day__today-badge">
                  Today
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}