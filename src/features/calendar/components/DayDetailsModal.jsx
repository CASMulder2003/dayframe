import { TASK_DEFINITIONS } from "../../../data/defaultData";

export default function DayDetailsModal({ dateLabel, entry, onClose }) {
  if (!entry) return null;

  const tasks = Object.entries(entry.hardTasks || {});

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="day-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="day-details-modal__header">
          <div>
            <p className="eyebrow">Day Overview</p>
            <h2 className="day-details-modal__title">{dateLabel}</h2>
          </div>

          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="day-details-modal__list">
          {tasks.map(([taskId, task]) => {
            const definition = TASK_DEFINITIONS[taskId];

            return (
              <div key={taskId} className="day-details-item">
                <div className="day-details-item__top">
                  <h3 className="day-details-item__title">
                    {definition?.title || taskId}
                  </h3>
                  <span
                    className={
                      task.completed
                        ? "day-details-item__status day-details-item__status--complete"
                        : "day-details-item__status"
                    }
                  >
                    {task.completed ? "Complete" : "Incomplete"}
                  </span>
                </div>

                <p className="day-details-item__meta">
                  {task.amount
                    ? `${task.amount} ${definition?.unit || ""}`.trim()
                    : "No amount logged"}
                </p>

                <p className="day-details-item__notes">
                  {task.notes || "No notes added"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}