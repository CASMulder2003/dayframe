import { useEffect, useState } from "react";

export default function TaskModal({ task, initialData, onClose, onSave }) {
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [notes, setNotes] = useState(initialData?.notes || "");

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function handleSave() {
    onSave({
      completed: true,
      amount,
      notes,
    });
  }

  function handleClear() {
    onSave({
      completed: false,
      amount: "",
      notes: "",
    });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="task-modal__header">
          <div>
            <p className="eyebrow">Daily Task</p>
            <h2 className="task-modal__title">{task.title}</h2>
          </div>

          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="task-modal__form">
          <div className="form-group">
            <label className="form-label">Amount ({task.unit})</label>
            <input
              className="form-input"
              type="text"
              placeholder={`Enter ${task.unit}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-textarea"
              placeholder={task.placeholder}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="task-modal__actions">
            <button
              type="button"
              className="button button--ghost"
              onClick={handleClear}
            >
              Clear
            </button>

            <button
              type="button"
              className="button button--primary"
              onClick={handleSave}
            >
              Save & Finalise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}