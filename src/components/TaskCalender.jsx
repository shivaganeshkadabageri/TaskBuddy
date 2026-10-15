
import { useState } from "react";

function CalendarView({ tasks = [] }) {
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Convert Sunday-first indexing to Monday-first indexing.
  const startingOffset = (firstDay + 6) % 7;

  const calendarCells = [
    ...Array(startingOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  const formatDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };

  const todayKey = formatDateKey(new Date());

  const selectedTasks = tasks.filter(
    (task) => task.dueDate === selectedDate
  );

  const changeMonth = (amount) => {
    setCurrentDate(new Date(year, month + amount, 1));
  };

  return (
    <section className="calendar-section">
      <div className="calendar-heading">
        <div>
          <h2>Task Calendar</h2>
          <p>View your tasks by their due dates.</p>
        </div>

        <button
          type="button"
          className="calendar-today-button"
          onClick={() => {
            const today = new Date();
            setCurrentDate(
              new Date(today.getFullYear(), today.getMonth(), 1)
            );
            setSelectedDate(formatDateKey(today));
          }}
        >
          Today
        </button>
      </div>

      <div className="calendar-card">
        <div className="calendar-month-header">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => changeMonth(-1)}
          >
            &#8249;
          </button>

          <h3>{monthName}</h3>

          <button
            type="button"
            aria-label="Next month"
            onClick={() => changeMonth(1)}
          >
            &#8250;
          </button>
        </div>

        <div className="calendar-grid">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day) => (
              <div className="calendar-weekday" key={day}>
                {day}
              </div>
            )
          )}

          {calendarCells.map((day, index) => {
            if (day === null) {
              return (
                <div
                  className="calendar-day calendar-day-empty"
                  key={`empty-${index}`}
                />
              );
            }

            const dateKey = formatDateKey(
              new Date(year, month, day)
            );

            const dayTasks = tasks.filter(
              (task) => task.dueDate === dateKey
            );

            const hasPending = dayTasks.some(
              (task) => !task.completed
            );

            const hasCompleted = dayTasks.some(
              (task) => task.completed
            );

            const isToday = dateKey === todayKey;
            const isSelected = dateKey === selectedDate;

            return (
              <button
                type="button"
                key={dateKey}
                className={[
                  "calendar-day",
                  isToday ? "calendar-day-today" : "",
                  isSelected ? "calendar-day-selected" : "",
                ].filter(Boolean).join(" ")}
                onClick={() => setSelectedDate(dateKey)}
                aria-pressed={isSelected}
                aria-label={`${dateKey}, ${dayTasks.length} tasks`}
              >
                <span>{day}</span>

                <span className="calendar-day-indicators">
                  {hasPending && (
                    <span className="calendar-dot pending-dot" />
                  )}

                  {hasCompleted && (
                    <span className="calendar-dot completed-dot" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="calendar-legend">
          <span>
            <span className="calendar-dot pending-dot" />
            Pending
          </span>

          <span>
            <span className="calendar-dot completed-dot" />
            Completed
          </span>
        </div>
      </div>

      <div className="calendar-selected-tasks">
        <h3>
          Tasks for{" "}
          {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
        </h3>

        {selectedTasks.length === 0 ? (
          <p className="calendar-no-tasks">
            No tasks scheduled for this date.
          </p>
        ) : (
          selectedTasks.map((task) => (
            <div className="calendar-task-item" key={task.id}>
              <div>
                <strong>{task.title}</strong>

                <p>
                  {task.completed ? "Completed" : "Pending"}
                  {" · "}
                  {task.priority} priority
                </p>
              </div>

              <span
                className={
                  task.completed
                    ? "calendar-task-status is-completed"
                    : "calendar-task-status is-pending"
                }
              >
                {task.completed ? "Done" : "Pending"}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default CalendarView;
