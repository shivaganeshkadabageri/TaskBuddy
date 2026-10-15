import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  toggleComplete,
  deleteTask
}) {
  return (
    <section className="my-tasks-container">
      <h2>My Tasks ({tasks.length})</h2>

      {tasks.length === 0 ? (
        <p className="no-tasks">
          No tasks available. Add your first task!
        </p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))
      )}
    </section>
  );
}

export default TaskList;