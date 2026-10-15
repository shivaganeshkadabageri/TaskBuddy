
function Analytics({ tasks = [] }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const priorityLevels = ["High", "Medium", "Low"];
  const categories = [
    ...new Set(tasks.map((task) => task.category || "General")),
  ];

  const priorityData = priorityLevels.map((priority) => ({
    label: priority,
    count: tasks.filter(
      (task) => task.priority === priority
    ).length,
    color: priority.toLowerCase(),
  }));

  const categoryData = categories.map((category) => ({
    label: category,
    count: tasks.filter(
      (task) => (task.category || "General") === category
    ).length,
  }));

  const renderBars = (items) =>
    items.length === 0 ? (
      <p className="analytics-empty">No data available yet.</p>
    ) : (
      items.map((item) => {
        const percentage =
          totalTasks === 0
            ? 0
            : (item.count / totalTasks) * 100;

        return (
          <div className="analytics-bar-item" key={item.label}>
            <div className="analytics-bar-label">
              <span>{item.label}</span>
              <strong>{item.count}</strong>
            </div>

            <div className="analytics-track">
              <div
                className={`analytics-fill ${item.color || "category"}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })
    );

  return (
    <section className="analytics-section">
      <div className="analytics-heading">
        <div>
          <h2>Productivity Analytics</h2>
          <p>Understand your workload at a glance.</p>
        </div>
      </div>

      <div className="analytics-summary">
        <article className="analytics-summary-card">
          <span>Completion Rate</span>
          <h3>{completionRate}%</h3>
          <p>{completedTasks} of {totalTasks} tasks completed</p>
        </article>

        <article className="analytics-summary-card">
          <span>Tasks Remaining</span>
          <h3>{pendingTasks}</h3>
          <p>Tasks still to complete</p>
        </article>
      </div>

      <div className="analytics-grid">
        <article className="analytics-card">
          <h3>Task Status</h3>
          {renderBars([
            {
              label: "Completed",
              count: completedTasks,
              color: "completed",
            },
            {
              label: "Pending",
              count: pendingTasks,
              color: "pending",
            },
          ])}
        </article>

        <article className="analytics-card">
          <h3>Priority Distribution</h3>
          {renderBars(priorityData)}
        </article>

        <article className="analytics-card">
          <h3>Category Distribution</h3>
          {renderBars(categoryData)}
        </article>
      </div>
    </section>
  );
}

export default Analytics;
