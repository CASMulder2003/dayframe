export default function SoftGoalCard({ goal, value, onChange }) {
  const numericValue = Number(value || 0);
  const progress =
    goal.target > 0 ? Math.min((numericValue / goal.target) * 100, 100) : 0;

  return (
    <div className="soft-goal-card">
      <div className="soft-goal-row">
        <div>
          <h3 className="soft-goal-card__title">{goal.title}</h3>
          <p className="soft-goal-card__target">
            Target: {goal.target}
            {goal.unit ? ` ${goal.unit}` : ""}
          </p>
        </div>

        <input
          className="soft-goal-input"
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
        />
      </div>

      <div className="progress">
        <div className="progress__bar" style={{ width: `${progress}%` }} />
      </div>

      <p className="soft-goal-card__progress">
        {value || 0}
        {goal.unit ? ` ${goal.unit}` : ""} logged
      </p>
    </div>
  );
}