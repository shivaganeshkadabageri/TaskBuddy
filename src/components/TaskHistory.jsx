function TaskHistory({
  tasks,
  toggleComplete,
  deleteTask,
  activities = []
}) {
  const completedTasks = tasks.filter(
    (task) => task.completed
  );

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const activityLabels = {
    created: "Created task",
    completed: "Completed task",
    restored: "Restored task",
    deleted: "Deleted task"
  };

  return (
    <>
      {/* Completed Task History */}
      <section className="task-history">
        <div className="history-header">
          <h2>Task History</h2>
          <span>{completedTasks.length} completed</span>
        </div>

        {completedTasks.length === 0 ? (
          <p className="no-history">
            No completed tasks yet.
          </p>
        ) : (
          <div className="history-list">
            {completedTasks.map((task) => (
              <div className="history-item" key={task.id}>
                <div className="history-details">
                  <h3>{task.title}</h3>

                  <p>
                    Priority: <strong>{task.priority}</strong>
                  </p>

                  <p>
                    Category: <strong>{task.category}</strong>
                  </p>
                </div>

                <div className="history-actions">
                  <button
                    onClick={() => toggleComplete(task.id)}
                  >
                    Restore
                  </button>

                  <button
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Are you sure you want to delete this task?"
                      );

                      if (confirmed) {
                        deleteTask(task.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Activity Timeline */}
      <section className="activity-timeline">
        <div className="history-header">
          <h2>Activity Timeline</h2>
          <span>{activities.length} activities</span>
        </div>

        {activities.length === 0 ? (
          <p className="no-history">
            No activities yet. Add or complete a task to get started.
          </p>
        ) : (
          <div className="activity-list">
            {activities.map((activity) => (
              <div
                className="activity-item"
                key={activity.id}
              >
                <span className="activity-dot" />

                <div className="activity-details">
                  <p>
                    <strong>
                      {activityLabels[activity.action] ||
                        activity.action}
                    </strong>
                    {" — "}
                    {activity.taskTitle}
                  </p>

                  <time>
                    {formatTimestamp(activity.timestamp)}
                  </time>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default TaskHistory;