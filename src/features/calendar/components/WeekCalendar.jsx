import { getWeekFromDate } from "../../../lib/date";

export default function WeekCalendar({
  baseDate,
  selectedDateISO,
  todayISO,
  onSelectDay,
}) {
  const week = getWeekFromDate(baseDate);

  return (
    <section className="calendar-card">
      <div className="calendar-card__header">
        <div>
          <p className="eyebrow">Week View</p>
          <h2 className="section-title">This Week</h2>
        </div>
      </div>

      <div className="week-calendar">
        {week.map((day) => {
          const isToday = day.iso === todayISO;
          const isSelected = day.iso === selectedDateISO;

          return (
            <button
              key={day.iso}
              type="button"
              className={[
                "week-day",
                isToday ? "week-day--today" : "",
                isSelected ? "week-day--selected" : "",
              ]
                .join(" ")
                .trim()}
              onClick={() => onSelectDay(day.iso)}
            >
              <span className="week-day__label">{day.label}</span>
              <span className="week-day__number">{day.dayNumber}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}