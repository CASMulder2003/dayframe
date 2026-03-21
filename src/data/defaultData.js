export const HARD_TASKS = [
  {
    id: "morningRoutine",
    title: "Morning Routine",
    unit: "mins",
    placeholder: "What did you do this morning?",
  },
  {
    id: "gym",
    title: "Gym",
    unit: "mins",
    placeholder: "What session did you do?",
  },
  {
    id: "deepWork",
    title: "Deep Work",
    unit: "hrs",
    placeholder: "What did you work on?",
  },
  {
    id: "admin",
    title: "Routine Tasks / Admin",
    unit: "hrs",
    placeholder: "What admin or routine tasks did you complete?",
  },
  {
    id: "cardio",
    title: "Cardio / Evening Session",
    unit: "mins",
    placeholder: "What cardio did you do?",
  },
];

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

export function createDefaultDayEntry() {
  return {
    hardTasks: {
      morningRoutine: {
        completed: false,
        value: "",
        notes: "",
      },
      gym: {
        completed: false,
        value: "",
        notes: "",
      },
      deepWork: {
        completed: false,
        value: "",
        notes: "",
      },
      admin: {
        completed: false,
        value: "",
        notes: "",
      },
      cardio: {
        completed: false,
        value: "",
        notes: "",
      },
    },
    softGoals: {
      steps: "",
      water: "",
      sleep: "",
    },
  };
}