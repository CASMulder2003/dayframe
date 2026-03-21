import { useEffect, useState } from "react";

export default function TaskModal({ task, initialData, onClose, onSave }) {
  const [value, setValue] = useState(initialData.value || "");
  const [notes, setNotes] = useState(initialData.notes || "");

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      completed: true,
      value,
      notes,
    });
  }

  function handleMarkIncomplete() {
    onSave({
      completed: false,
      value: "",
      notes: "",
    });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="task-modal" onClick={(event) => event.stopPropagation()}>
        <div className="task-modal__header">
          <div>
            <p className="eyebrow">Daily Task</p>
            <h2 className="task-modal__title">{task.title}</h2>
          </div>

          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-modal__form">
          <div className="form-group">
            <label className="form-label">
              Amount ({task.unit})
            </label>
            <input
              className="form-input"
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={`Enter ${task.unit}`}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-textarea"
              rows="5"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={task.placeholder}
            />
          </div>

          <div className="task-modal__actions">
            <button
              type="button"
              className="button button--ghost"
              onClick={handleMarkIncomplete}
            >
              Clear
            </button>

            <button type="submit" className="button button--primary">
              Save & Finalise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}