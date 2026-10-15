const STORAGE_KEY = "taskbuddy_tasks";

export const saveTasks = (tasks) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );
};

export const loadTasks = () => {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (!savedTasks) {
    return [];
  }

  return JSON.parse(savedTasks);
};

export const clearTasks = () => {
  localStorage.removeItem(STORAGE_KEY);
};