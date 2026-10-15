function TaskNotifications({ tasks }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const getDate = (dateString) => {
    if (!dateString) return null;

    const date = new Date(`${dateString}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const overdueTasks = tasks.filter((task) => {
    const dueDate = getDate(task.dueDate);

    return (
      !task.completed &&
      dueDate &&
      dueDate < today
    );
  });

  const dueTodayTasks = tasks.filter((task) => {
    const dueDate = getDate(task.dueDate);

    return (
      !task.completed &&
      dueDate &&
      dueDate.getTime() === today.getTime()
    );
  });

  const upcomingTasks = tasks.filter((task) => {
    const dueDate = getDate(task.dueDate);

    return (
      !task.completed &&
      dueDate &&
      dueDate.getTime() === tomorrow.getTime()
    );
  });

  if (
    overdueTasks.length === 0 &&
    dueTodayTasks.length === 0 &&
    upcomingTasks.length === 0
  ) {
    return (
      <section className="task-notifications">
        <h2>Task Reminders</h2>
        <p>No upcoming reminders. You're all caught up!</p>
      </section>
    );
  }

  return (
    <section className="task-notifications">
      <h2>Task Reminders</h2>

      {overdueTasks.length > 0 && (
        <div className="notification-group overdue">
          <h3>Overdue ({overdueTasks.length})</h3>

          <ul>
            {overdueTasks.map((task) => (
              <li key={task.id}>
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {dueTodayTasks.length > 0 && (
        <div className="notification-group due-today">
          <h3>Due Today ({dueTodayTasks.length})</h3>

          <ul>
            {dueTodayTasks.map((task) => (
              <li key={task.id}>
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {upcomingTasks.length > 0 && (
        <div className="notification-group upcoming">
          <h3>Due Tomorrow ({upcomingTasks.length})</h3>

          <ul>
            {upcomingTasks.map((task) => (
              <li key={task.id}>
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default TaskNotifications;