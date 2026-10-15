export const isValidTask = (task) => {
  return task.trim().length > 0;
};

export const isDuplicateTask = (task, tasks) => {
  const normalizedTask = task.trim().toLowerCase();

  return tasks.some(
    (existingTask) =>
      existingTask.title.trim().toLowerCase() ===
      normalizedTask
  );
};

export const calculateProgress = (tasks) => {
  if (tasks.length === 0) {
    return 0;
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  return Math.round(
    (completedTasks / tasks.length) * 100
  );
};