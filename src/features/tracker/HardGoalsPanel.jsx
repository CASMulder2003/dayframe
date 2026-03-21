import { useState } from "react"

function HardGoalsPanel() {
  const [goals, setGoals] = useState({
    gym: false,
    deepWork: false,
    admin: false,
    cardio: false,
  })

  function toggleGoal(goal) {
    setGoals((prev) => ({
      ...prev,
      [goal]: !prev[goal],
    }))
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Daily Tasks</h2>

      {Object.keys(goals).map((goal) => (
        <div key={goal}>
          <label>
            <input
              type="checkbox"
              checked={goals[goal]}
              onChange={() => toggleGoal(goal)}
            />
            {goal}
          </label>
        </div>
      ))}
    </div>
  )
}

export default HardGoalsPanel