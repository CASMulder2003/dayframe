import { useMemo, useState } from "react";
import WeekCalendar from "../../features/calendar/components/WeekCalendar";
import TaskCard from "../../features/tracker/components/TaskCard";
import TaskModal from "../../features/tracker/components/TaskModal";
import SoftGoalCard from "../../features/tracker/components/SoftGoalCard";
import FullCalendarModal from "../../features/calendar/components/FullCalendarModal";
import DayDetailsModal from "../../features/calendar/components/DayDetailsModal";

import {
  SOFT_GOALS,
  createDefaultDayEntry,
  TASK_DEFINITIONS,
} from "../../data/defaultData";

import useLocalStorage from "../../hooks/useLocalStorage";
import useCurrentDate from "../../hooks/useCurrentDate";
import { formatDisplayDate, toISODate } from "../../lib/date";

export default function HomePage() {
  const today = useCurrentDate();
  const todayISO = toISODate(today);

  const [selectedDateISO, setSelectedDateISO] = useState(todayISO);
  const [entries, setEntries] = useLocalStorage("dayframe-entries", {});
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dayDetails, setDayDetails] = useState(null);

  const baseDate = new Date(today);
  baseDate.setDate(baseDate.getDate() + weekOffset * 7);

  const selectedDate = new Date(selectedDateISO);

  function getTasksForDay(date) {
    const day = date.getDay();

    const structure = {
      0: ["morningRoutine", "gym", "deepWork", "cardio"],
      1: ["morningRoutine", "gym", "deepWork", "cardio"],
      2: ["morningRoutine", "gym", "deepWork"],
      3: ["morningRoutine", "deepWork", "admin"],
      4: ["morningRoutine", "gym", "deepWork", "cardio"],
      5: ["morningRoutine", "gym", "deepWork"],
      6: ["morningRoutine", "deepWork", "freeTime"],
    };

    return structure[day].map((id) => TASK_DEFINITIONS[id]);
  }

  const tasksForDay = useMemo(
    () => getTasksForDay(selectedDate),
    [selectedDateISO]
  );

  function ensureEntry(dateIso) {
    return entries[dateIso] || createDefaultDayEntry(new Date(dateIso));
  }

  const selectedEntry = ensureEntry(selectedDateISO);

  function updateDay(updater) {
    setEntries((prev) => ({
      ...prev,
      [selectedDateISO]: updater(ensureEntry(selectedDateISO)),
    }));
  }

  function handleSaveTask(taskId, data) {
    updateDay((existing) => ({
      ...existing,
      hardTasks: {
        ...existing.hardTasks,
        [taskId]: data,
      },
    }));
    setActiveTaskId(null);
  }

  function handleOpenDayDetails(dateIso) {
    setDayDetails({
      entry: ensureEntry(dateIso),
      dateLabel: formatDisplayDate(new Date(dateIso)),
    });
  }

  const completedCount = tasksForDay.filter(
    (t) => selectedEntry.hardTasks?.[t.id]?.completed
  ).length;

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">Personal productivity system</p>
        <h1 className="page-title">Dayframe</h1>
        <p className="page-subtitle">
          {formatDisplayDate(selectedDate)} • {completedCount}/
          {tasksForDay.length} core tasks completed
        </p>
      </section>

      <WeekCalendar
        baseDate={baseDate}
        selectedDateISO={selectedDateISO}
        todayISO={todayISO}
        onSelectDay={setSelectedDateISO}
        weekOffset={weekOffset}
        setWeekOffset={setWeekOffset}
        entries={entries}
        onOpenFullCalendar={() => setShowCalendar(true)}
      />

      <section className="dashboard-grid">
        <div className="card">
          <h2 className="section-title">Daily Tasks</h2>

          <div className="task-list">
            {tasksForDay.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                taskData={selectedEntry.hardTasks?.[task.id]}
                onClick={() => setActiveTaskId(task.id)}
              />
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Soft Goals</h2>

          {SOFT_GOALS.map((goal) => (
            <SoftGoalCard
              key={goal.id}
              goal={goal}
              value={selectedEntry.softGoals?.[goal.id] || ""}
              onChange={(val) =>
                updateDay((existing) => ({
                  ...existing,
                  softGoals: {
                    ...existing.softGoals,
                    [goal.id]: val,
                  },
                }))
              }
            />
          ))}
        </div>
      </section>

      {activeTaskId && (
        <TaskModal
          task={TASK_DEFINITIONS[activeTaskId]}
          initialData={selectedEntry.hardTasks?.[activeTaskId]}
          onClose={() => setActiveTaskId(null)}
          onSave={(data) => handleSaveTask(activeTaskId, data)}
        />
      )}

      {showCalendar && (
        <FullCalendarModal
          entries={entries}
          onClose={() => setShowCalendar(false)}
          onOpenDayDetails={(dateIso, label) => {
            setShowCalendar(false);
            setDayDetails({ entry: ensureEntry(dateIso), dateLabel: label });
          }}
        />
      )}

      {dayDetails && (
        <DayDetailsModal
          entry={dayDetails.entry}
          dateLabel={dayDetails.dateLabel}
          onClose={() => setDayDetails(null)}
        />
      )}
    </div>
  );
}