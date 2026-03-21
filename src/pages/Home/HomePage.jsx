import WeekCalendar from "../../features/calendar/WeekCalendar.jsx"
import HardGoalsPanel from "../../features/tracker/HardGoalsPanel.jsx"
import SoftGoalsPanel from "../../features/tracker/SoftGoalsPanel.jsx"

function HomePage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dayframe</h1>

      <WeekCalendar />

      <HardGoalsPanel />

      <SoftGoalsPanel />
    </div>
  )
}

export default HomePage