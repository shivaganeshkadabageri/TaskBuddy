function FilterBar({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy
}) {
  return (
    <section className="task-controls-container">
      <h2 className="task-controls-title">
        Task Controls
      </h2>

      <div className="filter-container">

        {/* Search */}
        <div className="task-search">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            aria-label="Search tasks by title"
          />
        </div>

        {/* Status Filter */}
        <div className="filter-bar">
          <button
            className={
              statusFilter === "all" ? "active-filter" : ""
            }
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>

          <button
            className={
              statusFilter === "active" ? "active-filter" : ""
            }
            onClick={() => setStatusFilter("active")}
          >
            Active
          </button>

          <button
            className={
              statusFilter === "completed" ? "active-filter" : ""
            }
            onClick={() => setStatusFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* Priority Filter */}
        <div className="priority-filter">
          <label htmlFor="priority-filter">
            Priority:
          </label>

          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
          >
            <option value="all">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <label htmlFor="category-filter">
            Category:
          </label>

          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
          >
            <option value="all">All Categories</option>
            <option value="Work">Work</option>
            <option value="Learning">Learning</option>
            <option value="Personal">Personal</option>
            <option value="General">General</option>
          </select>
        </div>

        {/* Sorting */}
        <div className="sort-filter">
          <label htmlFor="sort-filter">
            Sort by:
          </label>

          <select
            id="sort-filter"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="default">Default Order</option>
            <option value="title">Title (A–Z)</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

      </div>
    </section>
  );
}

export default FilterBar;