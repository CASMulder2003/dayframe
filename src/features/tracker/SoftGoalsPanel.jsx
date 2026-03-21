import { useState } from "react"

function SoftGoalsPanel() {
  const [values, setValues] = useState({
    steps: "",
    water: "",
    sleep: "",
  })

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
      <h2>Health Goals</h2>

      <div>
        <label>Steps: </label>
        <input
          name="steps"
          value={values.steps}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Water (L): </label>
        <input
          name="water"
          value={values.water}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Sleep (hrs): </label>
        <input
          name="sleep"
          value={values.sleep}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default SoftGoalsPanel