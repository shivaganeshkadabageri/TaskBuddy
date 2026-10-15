import { useState } from "react";

function TaskForm({ addTask, tasks = [] }) {

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const [error, setError] = useState("");
  const [dueDate, setDueDate] = useState("");

  const MAX_LENGTH = 100;

  const handleSubmit = (event) => {

    event.preventDefault();

    const trimmedTask = task.trim();

    // Empty task validation
    if (!trimmedTask) {

      setError("Please enter a task.");

      return;
    }

    // Maximum length validation
    if (trimmedTask.length > MAX_LENGTH) {

      setError(
        `Task cannot exceed ${MAX_LENGTH} characters.`
      );

      return;
    }

    // Duplicate task validation
    const duplicateTask = tasks.some(
      (existingTask) =>
        existingTask.title.trim().toLowerCase() ===
        trimmedTask.toLowerCase()
    );

    if (duplicateTask) {

      setError("This task already exists.");

      return;
    }

    // Create new task
    const newTask = {
      id: Date.now(),
      title: trimmedTask,
      priority: priority,
      category: category,
      dueDate: dueDate||null,
      completed: false
    };

    // Send task to App.jsx
    addTask(newTask);

    // Reset form
    setTask("");
    setPriority("Medium");
    setCategory("General");
    setDueDate("");
    setError("");
  };


  const handleTaskChange = (event) => {

    setTask(event.target.value);

    if (error) {
      setError("");
    }
  };


  return (
    <section className="task-form">

      <h2>Add New Task</h2>

      <form onSubmit={handleSubmit}>

        {/* Task Name */}

        <div className="form-group">

          <label htmlFor="task">
            Task Name
          </label>

          <input
            id="task"
            type="text"
            value={task}
            onChange={handleTaskChange}
            placeholder="Enter your task"
            maxLength={MAX_LENGTH}
          />

          <div className="character-count">
            {task.length}/{MAX_LENGTH}
          </div>

        </div>


        {/* Priority and Category */}

        <div className="form-row">

          {/* Priority */}

          <div className="form-group">

            <label htmlFor="priority">
              Priority
            </label>

            <select
              id="priority"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value)
              }
            >

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

          </div>


          {/* Category */}

          <div className="form-group">

            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              <option value="General">
                General
              </option>

              <option value="Work">
                Work
              </option>

              <option value="Personal">
                Personal
              </option>

              <option value="Learning">Learning</option>

            </select>

          </div>

        </div>

              {/* Optional Due Date */}

<div className="form-group">
  <label htmlFor="dueDate">
    Due Date (Optional)
  </label>

  <input
    id="dueDate"
    type="date"
    value={dueDate}
    min={new Date().toLocaleDateString("en-CA")}
    onChange={(event) => setDueDate(event.target.value)}
  />
</div>

        {/* Error Message */}

        {error && (
          <p
            className="error-message"
            role="alert"
          >
            {error}
          </p>
        )}


        {/* Add Task Button */}

        <button
          type="submit"
          data-testid="add-task-button"
        >
          Add Task
        </button>

      </form>

    </section>
  );
}

export default TaskForm;