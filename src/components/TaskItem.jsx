function TaskItem({
  task,
  toggleComplete,
  deleteTask
}) {
  return (
    <div className="task-item">

      <div className="task-details">

        <h3 className={task.completed ? "completed" : ""}>
          {task.title}
        </h3>

       <p>
       Priority:{" "}
      <span
      className={`priority-badge ${task.priority.toLowerCase()}`}
      >
      {task.priority}
      </span>
      </p>

       <p>
      Category:{" "}
      <span className="category-badge">
      {task.category}
      </span>
      </p>

        <p>
        Status:{" "}
        <span
        className={
        task.completed
        ? "status-badge completed-status"
        : "status-badge pending-status"
        }
      >
      {task.completed ? "Completed" : "Pending"}
      </span>
      </p>

      
        
{task.dueDate && (() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(
    `${task.dueDate}T00:00:00`
  );

  let deadlineStatus = "Upcoming";

  if (!task.completed) {
    if (deadline < today) {
      deadlineStatus = "Overdue";
    } else if (deadline.getTime() === today.getTime()) {
      deadlineStatus = "Due Today";
    }
  }

  return (
    <div className="task-deadline">
      <p className="task-due-date">
        <strong>Due Date:</strong>{" "}
        {deadline.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>

      <span
        className={`deadline-badge ${
          deadlineStatus === "Overdue"
            ? "deadline-overdue"
            : deadlineStatus === "Due Today"
              ? "deadline-today"
              : "deadline-upcoming"
        }`}
      >
        {task.completed ? "Completed" : deadlineStatus}
      </span>
    </div>
  );
})()}

      
      </div>

      <div className="task-actions">

        <button
          onClick={() => toggleComplete(task.id)}
        >
          {task.completed ? "Undo" : "Complete"}
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
  );
}

export default TaskItem;