export default function TaskCard({ title, taskData, onClick }) {
  const { completed, value, notes } = taskData;

  let summary = "Not completed yet";

  if (completed && value && notes) {
    summary = `${value} logged • Notes added`;
  } else if (completed && value) {
    summary = `${value} logged`;
  } else if (completed && notes) {
    summary = "Completed • Notes added";
  } else if (completed) {
    summary = "Completed";
  }

  return (
    <button type="button" className="task-card" onClick={onClick}>
      <div className="task-card__left">
        <div
          className={
            completed
              ? "task-card__status task-card__status--complete"
              : "task-card__status"
          }
        >
          {completed ? "✓" : ""}
        </div>

        <div>
          <h3 className="task-card__title">{title}</h3>
          <p className="task-card__summary">{summary}</p>
        </div>
      </div>

      <span className="task-card__arrow">→</span>
    </button>
  );
}