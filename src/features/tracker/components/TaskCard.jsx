export default function TaskCard({ title, taskData, onClick }) {
  let summary = "Not completed yet";

  if (taskData?.completed) {
    if (taskData.amount && taskData.notes) {
      summary = `${taskData.amount} logged • Notes added`;
    } else if (taskData.amount) {
      summary = `${taskData.amount} logged`;
    } else if (taskData.notes) {
      summary = "Completed • Notes added";
    } else {
      summary = "Completed";
    }
  }

  return (
    <button type="button" className="task-card" onClick={onClick}>
      <div className="task-card__content">
        <div
          className={
            taskData?.completed
              ? "task-card__status task-card__status--complete"
              : "task-card__status"
          }
        >
          {taskData?.completed ? "✓" : ""}
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