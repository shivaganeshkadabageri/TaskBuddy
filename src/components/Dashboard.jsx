
function Dashboard({ tasks = [] }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;
  
const today = new Date();
today.setHours(0, 0, 0, 0);

const dueTodayTasks = tasks.filter((task) => {
  if (!task.dueDate || task.completed) {
    return false;
  }

  const deadline = new Date(`${task.dueDate}T00:00:00`);

  return deadline.getTime() === today.getTime();
}).length;

const overdueTasks = tasks.filter((task) => {
  if (!task.dueDate || task.completed) {
    return false;
  }

  const deadline = new Date(`${task.dueDate}T00:00:00`);

  return deadline < today;
}).length;


  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const statistics = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: "📋",
      color: "blue",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: "✅",
      color: "green",
    },
    {
      label: "Pending",
      value: pendingTasks,
      icon: "⏳",
      color: "orange",
    },
    {
      label: "Due Today",
      value: dueTodayTasks,
      icon: "⏰",
      color: "blue",
    },
    {
      label: "Overdue",
      value: overdueTasks,
      icon: "⚠️",
      color: "red",
    },
  ];

  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <div>
          <h2>Productivity Overview</h2>
          <p>Track your progress and stay productive.</p>
        </div>

        <span className="dashboard-badge">
          TaskBuddy 2.0
        </span>
      </div>

      <div className="dashboard-stats">
        {statistics.map((item) => (
          <article
            className={`stat-card ${item.color}`}
            key={item.label}
          >
            <div className="stat-card-top">
              <span>{item.label}</span>
              <span className="stat-icon">
                {item.icon}
              </span>
            </div>

            <h3>{item.value}</h3>
          </article>
        ))}
      </div>

      <div className="dashboard-progress">
        <div className="dashboard-progress-header">
          <div>
            <h3>Overall Progress</h3>
            <p>Tasks completed so far</p>
          </div>

          <strong>{completionPercentage}%</strong>
        </div>

        <div
          className="dashboard-progress-track"
          role="progressbar"
          aria-label="Task completion progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={completionPercentage}
        >
          <div
            className="dashboard-progress-fill"
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
