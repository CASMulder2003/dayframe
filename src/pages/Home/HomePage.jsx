import { useMemo, useState } from "react";
import WeekCalendar from "../../features/calendar/components/WeekCalendar";
import TaskCard from "../../features/tracker/components/TaskCard";
import TaskModal from "../../features/tracker/components/TaskModal";
import SoftGoalCard from "../../features/tracker/components/SoftGoalCard";
import { HARD_TASKS, SOFT_GOALS, createDefaultDayEntry } from "../../data/defaultData";
import useLocalStorage from "../../hooks/useLocalStorage";
import useCurrentDate from "../../hooks/useCurrentDate";
import { formatDisplayDate, toISODate } from "../../lib/date";

export default function HomePage() {
  const today = useCurrentDate();
  const todayISO = toISODate(today);

  const [selectedDateISO, setSelectedDateISO] = useState(todayISO);
  const [entries, setEntries] = useLocalStorage("dayframe-entries", {});
  const [activeTaskId, setActiveTaskId] = useState(null);

  const selectedDate = new Date(selectedDateISO);
  const selectedEntry = useMemo(() => {
    return entries[selectedDateISO] || createDefaultDayEntry();
  }, [entries, selectedDateISO]);

  const activeTask = HARD_TASKS.find((task) => task.id === activeTaskId);

  function updateSelectedDay(updater) {
    setEntries((prev) => {
      const existing = prev[selectedDateISO] || createDefaultDayEntry();

      return {
        ...prev,
        [selectedDateISO]: updater(existing),
      };
    });
  }

  function handleSaveTask(taskId, taskValue) {
    updateSelectedDay((existing) => ({
      ...existing,
      hardTasks: {
        ...existing.hardTasks,
        [taskId]: taskValue,
      },
    }));

    setActiveTaskId(null);
  }

  function handleSoftGoalChange(goalId, newValue) {
    updateSelectedDay((existing) => ({
      ...existing,
      softGoals: {
        ...existing.softGoals,
        [goalId]: newValue,
      },
    }));
  }

  const completedCount = HARD_TASKS.filter(
    (task) => selectedEntry.hardTasks[task.id]?.completed
  ).length;

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">Personal productivity system</p>
        <h1 className="page-title">Dayframe</h1>
        <p className="page-subtitle">
          {formatDisplayDate(selectedDate)} • {completedCount}/{HARD_TASKS.length} core tasks completed
        </p>
      </section>

      <WeekCalendar
        baseDate={selectedDate}
        selectedDateISO={selectedDateISO}
        todayISO={todayISO}
        onSelectDay={setSelectedDateISO}
      />

      <section className="dashboard-grid">
        <div className="card">
          <div className="card__header">
            <div>
              <p className="eyebrow">Core tasks</p>
              <h2 className="section-title">Daily Tasks</h2>
            </div>
          </div>

          <div className="task-list">
            {HARD_TASKS.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                taskData={selectedEntry.hardTasks[task.id]}
                onClick={() => setActiveTaskId(task.id)}
              />
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <div>
              <p className="eyebrow">Health metrics</p>
              <h2 className="section-title">Soft Goals</h2>
            </div>
          </div>

          <div className="soft-goals-list">
            {SOFT_GOALS.map((goal) => (
              <SoftGoalCard
                key={goal.id}
                goal={goal}
                value={selectedEntry.softGoals[goal.id]}
                onChange={(newValue) => handleSoftGoalChange(goal.id, newValue)}
              />
            ))}
          </div>
        </div>
      </section>

      {activeTask && (
        <TaskModal
          task={activeTask}
          initialData={selectedEntry.hardTasks[activeTask.id]}
          onClose={() => setActiveTaskId(null)}
          onSave={(taskValue) => handleSaveTask(activeTask.id, taskValue)}
        />
      )}
    </div>
  );
}