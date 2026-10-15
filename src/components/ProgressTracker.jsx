function ProgressTracker({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <section className="progress-tracker">
      <div className="progress-header">
        <h2>Progress</h2>

        <span>{progress}%</span>
      </div>

      <p>
        {completedTasks} of {totalTasks} tasks completed
      </p>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </section>
  );
}

export default ProgressTracker;