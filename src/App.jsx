import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import ProgressTracker from "./components/ProgressTracker";
import TaskHistory from "./components/TaskHistory";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import CalenderView from "./components/TaskCalender.jsx";
import KanbanBoard from "./components/KanbanBoard.jsx";
import TaskNotifications from "./components/TaskNotifications.jsx";
import WelcomePage from "./components/WelcomePage.jsx";

import { saveTasks, loadTasks } from "./utils/storage";

const navigationItems = [
  { id: "overview", icon: "▦", label: "Overview" },
  { id: "tasks", icon: "✓", label: "My Tasks" },
  { id: "calendar", icon: "▣", label: "Calendar" },
  { id: "kanban", icon: "▤", label: "Kanban Board" },
  { id: "analytics", icon: "↗", label: "Analytics" },
  { id: "activity", icon: "◷", label: "Activity History" },
  { id: "exit", icon: "↪", label: "Exit" },
];

function App() {
  const [tasks, setTasks] = useState(() => loadTasks());

  const [userProfile, setUserProfile] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("taskbuddy-user-profile-v2")
        ) || null
      );
    } catch {
      return null;
    }
  });

  const [activities, setActivities] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("taskbuddy-activities")
        ) || []
      );
    } catch {
      return [];
    }
  });

  const [activeView, setActiveView] = useState("overview");

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("taskbuddy-theme") === "dark"
  );

  // Exit the current workspace without deleting saved data.
  const handleExit = () => {
    const confirmed = window.confirm(
      "Are you sure you want to exit TaskBuddy?"
    );

    if (confirmed) {
      setUserProfile(null);
      setActiveView("overview");
    }
  };

  const toggleTheme = () => {
    setDarkMode((previousMode) => {
      const nextMode = !previousMode;

      localStorage.setItem(
        "taskbuddy-theme",
        nextMode ? "dark" : "light"
      );

      return nextMode;
    });
  };

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      "taskbuddy-activities",
      JSON.stringify(activities)
    );
  }, [activities]);

  const recordActivity = (task, action) => {
    const activity = {
      id: `${Date.now()}-${Math.random()}`,
      taskId: task.id,
      taskTitle: task.title,
      action,
      timestamp: new Date().toISOString(),
    };

    setActivities((previousActivities) =>
      [activity, ...previousActivities].slice(0, 200)
    );
  };

  const addTask = (newTask) => {
    setTasks((previousTasks) => [...previousTasks, newTask]);
    recordActivity(newTask, "created");
  };

  const toggleComplete = (id) => {
    const task = tasks.find(
      (item) => String(item.id) === String(id)
    );

    if (!task) return;

    recordActivity(
      task,
      task.completed ? "restored" : "completed"
    );

    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        String(item.id) === String(id)
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const task = tasks.find(
      (item) => String(item.id) === String(taskId)
    );

    if (!task) return;

    if (task.completed !== (newStatus === "completed")) {
      recordActivity(
        task,
        newStatus === "completed" ? "completed" : "restored"
      );
    }

    setTasks((previousTasks) =>
      previousTasks.map((item) => {
        if (String(item.id) !== String(taskId)) {
          return item;
        }

        return {
          ...item,
          status: newStatus,
          completed: newStatus === "completed",
        };
      })
    );
  };

  const deleteTask = (id) => {
    const task = tasks.find(
      (item) => String(item.id) === String(id)
    );

    if (!task) return;

    recordActivity(task, "deleted");

    setTasks((previousTasks) =>
      previousTasks.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  const filteredTasks = tasks
    .filter((task) => {
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !task.completed) ||
        (statusFilter === "completed" && task.completed);

      const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        task.category === categoryFilter;

      const matchesSearch = (task.title || "")
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      return (
        matchesStatus &&
        matchesPriority &&
        matchesCategory &&
        matchesSearch
      );
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      }

      if (sortBy === "dueDate") {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return a.dueDate.localeCompare(b.dueDate);
      }

      if (sortBy === "priority") {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        return (
          (priorityOrder[a.priority] || 4) -
          (priorityOrder[b.priority] || 4)
        );
      }

      return 0;
    });

  // Show the welcome page when the user exits.
  if (!userProfile) {
    return <WelcomePage onComplete={setUserProfile} />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "tasks":
        return (
          <>
            <TaskForm addTask={addTask} />

            <FilterBar
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <TaskList
              tasks={filteredTasks}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
            />
          </>
        );

      case "calendar":
        return <CalenderView tasks={tasks} />;

      case "kanban":
        return (
          <KanbanBoard
            tasks={tasks}
            updateTaskStatus={updateTaskStatus}
          />
        );

      case "analytics":
        return <Analytics tasks={tasks} />;

      case "activity":
        return (
          <TaskHistory
            tasks={tasks}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            activities={activities}
          />
        );

      case "overview":
      default:
        return (
          <>
            <Dashboard tasks={tasks} />
            <TaskNotifications tasks={tasks} />
            <ProgressTracker tasks={tasks} />
          </>
        );
    }
  };

  const activeItem = navigationItems.find(
    (item) => item.id === activeView
  );

  return (
    <div
      className={`app dashboard-app ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">T</div>
          <div>
            <h2>TaskBuddy</h2>
            <p>Productivity workspace</p>
          </div>
        </div>

        <p className="sidebar-section-label">WORKSPACE</p>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar-link ${
                activeView === item.id ? "active" : ""
              }`}
              onClick={() => {
                if (item.id === "exit") {
                  handleExit();
                } else {
                  setActiveView(item.id);
                }
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-status-dot" />
          <span>Stay focused. Keep going.</span>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-heading">
            <span className="topbar-eyebrow">
              TASKBUDDY WORKSPACE
            </span>
            <h1>{activeItem?.label || "Overview"}</h1>
          </div>

          <Header
            darkMode={darkMode}
            toggleTheme={toggleTheme}
            userProfile={userProfile}
          />
        </header>

        <main className="dashboard-content" key={activeView}>
          {renderActiveView()}
        </main>

        <footer className="dashboard-footer">
          TaskBuddy · Your goals, your pace, your success.
        </footer>
      </div>
    </div>
  );
}

export default App;