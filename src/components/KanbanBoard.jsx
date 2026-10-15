
function KanbanBoard({ tasks = [], updateTaskStatus }) {
  const columns = [
    {
      id: "todo",
      title: "To Do",
      description: "Tasks waiting to start",
    },
    {
      id: "in-progress",
      title: "In Progress",
      description: "Tasks you're working on",
    },
    {
      id: "completed",
      title: "Completed",
      description: "Finished tasks",
    },
  ];

  const getTaskStatus = (task) => {
    if (task.status) {
      return task.status;
    }

    return task.completed ? "completed" : "todo";
  };

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("text/plain", String(taskId));
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event, newStatus) => {
    event.preventDefault();

    const taskId = event.dataTransfer.getData("text/plain");

    if (taskId && updateTaskStatus) {
      updateTaskStatus(taskId, newStatus);
    }
  };

  return (
    <section className="kanban-section">
      <div className="kanban-heading">
        <div>
          <h2>Kanban Board</h2>
          <p>Drag tasks between columns to update their status.</p>
        </div>
      </div>

      <div className="kanban-board">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => getTaskStatus(task) === column.id
          );

          return (
            <div
              className={`kanban-column kanban-${column.id}`}
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, column.id)}
            >
              <div className="kanban-column-header">
                <div>
                  <h3>{column.title}</h3>
                  <p>{column.description}</p>
                </div>

                <span className="kanban-count">
                  {columnTasks.length}
                </span>
              </div>

              <div className="kanban-column-content">
                {columnTasks.length === 0 ? (
                  <p className="kanban-empty">
                    Drop tasks here
                  </p>
                ) : (
                  columnTasks.map((task) => (
                    <article
                      className="kanban-task"
                      key={task.id}
                      draggable
                      onDragStart={(event) =>
                        handleDragStart(event, task.id)
                      }
                    >
                      <div className="kanban-task-title">
                        <span className="kanban-drag-icon">
                          ⠿
                        </span>

                        <strong>{task.title}</strong>
                      </div>

                      <div className="kanban-task-meta">
                        <span
                          className={`priority-badge ${
                            (task.priority || "Medium").toLowerCase()
                          }`}
                        >
                          {task.priority || "Medium"}
                        </span>

                        {task.category && (
                          <span className="category-badge">
                            {task.category}
                          </span>
                        )}
                      </div>

                      {task.dueDate && (
                        <p className="kanban-due-date">
                          📅{" "}
                          {new Date(
                            `${task.dueDate}T00:00:00`
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </article>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default KanbanBoard;
