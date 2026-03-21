import { useState } from "react"

function getWeekDays() {
  const today = new Date()
  const dayIndex = today.getDay()

  const start = new Date(today)
  start.setDate(today.getDate() - dayIndex)

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

function WeekCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const week = getWeekDays()

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "30px",
      }}
    >
      {week.map((date, index) => {
        const isToday =
          date.toDateString() === new Date().toDateString()

        const isSelected =
          date.toDateString() === selectedDate.toDateString()

        return (
          <div
            key={index}
            onClick={() => setSelectedDate(date)}
            style={{
              textAlign: "center",
              cursor: "pointer",
              flex: 1,
            }}
          >
            <div style={{ fontSize: "12px", color: "#888" }}>
              {date.toLocaleDateString("en-US", { weekday: "short" })}
            </div>

            <div
              style={{
                margin: "8px auto",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isToday ? "#e63946" : "transparent",
                color: isToday ? "white" : "black",
                border: isSelected && !isToday ? "2px solid #e63946" : "none",
                fontWeight: "bold",
              }}
            >
              {date.getDate()}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WeekCalendar