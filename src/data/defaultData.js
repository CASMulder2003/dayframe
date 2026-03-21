export const TASK_DEFINITIONS = {
  morningRoutine: {
    id: "morningRoutine",
    title: "Morning Routine",
    unit: "mins",
    placeholder: "What did you do this morning?",
  },
  gym: {
    id: "gym",
    title: "Gym",
    unit: "mins",
    placeholder: "What session did you do?",
  },
  deepWork: {
    id: "deepWork",
    title: "Deep Work",
    unit: "hrs",
    placeholder: "What did you work on?",
  },
  admin: {
    id: "admin",
    title: "Routine Tasks / Admin",
    unit: "hrs",
    placeholder: "What admin or lighter tasks did you complete?",
  },
  cardio: {
    id: "cardio",
    title: "Cardio / Evening Session",
    unit: "mins",
    placeholder: "What cardio did you do?",
  },
  freeTime: {
    id: "freeTime",
    title: "Free Time / Wind Down",
    unit: "hrs",
    placeholder: "How did you spend your evening / downtime?",
  },
};

export const SOFT_GOALS = [
  {
    id: "steps",
    title: "Steps",
    unit: "",
    target: 10000,
    inputType: "number",
  },
  {
    id: "water",
    title: "Water",
    unit: "L",
    target: 3,
    inputType: "number",
  },
  {
    id: "sleep",
    title: "Sleep",
    unit: "hrs",
    target: 7,
    inputType: "number",
  },
];

const WEEKLY_PLAN = {
  0: ["morningRoutine", "gym", "deepWork", "admin", "cardio", "freeTime"], // Sun
  1: ["morningRoutine", "gym", "deepWork", "admin", "cardio", "freeTime"], // Mon
  2: ["morningRoutine", "gym", "deepWork", "admin", "freeTime"], // Tue
  3: ["morningRoutine", "deepWork", "admin", "freeTime"], // Wed
  4: ["morningRoutine", "gym", "deepWork", "admin", "cardio", "freeTime"], // Thu
  5: ["morningRoutine", "gym", "deepWork", "admin", "freeTime"], // Fri
  6: ["morningRoutine", "deepWork", "admin", "freeTime"], // Sat
};

export function getTasksForDate(date) {
  const dayIndex = new Date(date).getDay();
  return (WEEKLY_PLAN[dayIndex] || []).map((id) => TASK_DEFINITIONS[id]);
}

export function createDefaultTaskEntry() {
  return {
    completed: false,
    amount: "",
    notes: "",
  };
}

export function createDefaultDayEntry(date = new Date()) {
  const tasksForDay = getTasksForDate(date);

  const hardTasks = {};
  tasksForDay.forEach((task) => {
    hardTasks[task.id] = createDefaultTaskEntry();
  });

  return {
    hardTasks,
    softGoals: {
      steps: "",
      water: "",
      sleep: "",
    },
  };
}