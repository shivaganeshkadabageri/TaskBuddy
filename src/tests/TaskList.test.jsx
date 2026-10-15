/**
 * @vitest-environment jsdom
 */

import {
  render,
  screen,
  fireEvent,
  cleanup
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
  vi,
  afterEach
} from "vitest";

import TaskList from "../components/TaskList";


describe("TaskList Component", () => {

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });


  // Test 1: Empty task list
  it("should display message when there are no tasks", () => {

    const toggleComplete = vi.fn();
    const deleteTask = vi.fn();

    render(
      <TaskList
        tasks={[]}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    );

    expect(
      screen.getByText("Tasks (0)")
    ).toBeTruthy();

    expect(
      screen.getByText(
        "No tasks available. Add your first task!"
      )
    ).toBeTruthy();

  });


  // Test 2: Display tasks
  it("should display all tasks", () => {

    const toggleComplete = vi.fn();
    const deleteTask = vi.fn();

    const tasks = [
      {
        id: 1,
        title: "Learn React",
        priority: "High",
        category: "Work",
        completed: false
      },
      {
        id: 2,
        title: "Practice Java",
        priority: "Medium",
        category: "Personal",
        completed: false
      }
    ];

    render(
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    );

    expect(
      screen.getByText("Tasks (2)")
    ).toBeTruthy();

    expect(
      screen.getByText("Learn React")
    ).toBeTruthy();

    expect(
      screen.getByText("Practice Java")
    ).toBeTruthy();

  });


  // Test 3: Display task information
  it("should display task priority, category and status", () => {

    const toggleComplete = vi.fn();
    const deleteTask = vi.fn();

    const tasks = [
      {
        id: 1,
        title: "Learn React",
        priority: "High",
        category: "Work",
        completed: false
      }
    ];

    render(
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    );

    expect(
      screen.getByText("High")
    ).toBeTruthy();

    expect(
      screen.getByText("Work")
    ).toBeTruthy();

    expect(
      screen.getByText("Pending")
    ).toBeTruthy();

  });


  // Test 4: Complete task
  it("should call toggleComplete when Complete is clicked", () => {

    const toggleComplete = vi.fn();
    const deleteTask = vi.fn();

    const tasks = [
      {
        id: 1,
        title: "Learn React",
        priority: "High",
        category: "Work",
        completed: false
      }
    ];

    render(
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Complete"
      })
    );

    expect(
      toggleComplete
    ).toHaveBeenCalledTimes(1);

    expect(
      toggleComplete
    ).toHaveBeenCalledWith(1);

  });


  // Test 5: Undo completed task
  it("should display Undo for a completed task", () => {

    const toggleComplete = vi.fn();
    const deleteTask = vi.fn();

    const tasks = [
      {
        id: 1,
        title: "Learn React",
        priority: "High",
        category: "Work",
        completed: true
      }
    ];

    render(
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    );

    expect(
      screen.getByRole("button", {
        name: "Undo"
      })
    ).toBeTruthy();

    expect(
      screen.getByText("Completed")
    ).toBeTruthy();

  });


  // Test 6: Undo task
  it("should call toggleComplete when Undo is clicked", () => {

    const toggleComplete = vi.fn();
    const deleteTask = vi.fn();

    const tasks = [
      {
        id: 10,
        title: "Complete Project",
        priority: "Medium",
        category: "Work",
        completed: true
      }
    ];

    render(
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Undo"
      })
    );

    expect(
      toggleComplete
    ).toHaveBeenCalledTimes(1);

    expect(
      toggleComplete
    ).toHaveBeenCalledWith(10);

  });


  // Test 7: Delete task after confirmation
  it("should delete task when deletion is confirmed", () => {

    const toggleComplete = vi.fn();
    const deleteTask = vi.fn();

    vi.spyOn(
      window,
      "confirm"
    ).mockReturnValue(true);

    const tasks = [
      {
        id: 5,
        title: "Delete This Task",
        priority: "Low",
        category: "Personal",
        completed: false
      }
    ];

    render(
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Delete"
      })
    );

    expect(
      window.confirm
    ).toHaveBeenCalledWith(
      "Are you sure you want to delete this task?"
    );

    expect(
      deleteTask
    ).toHaveBeenCalledTimes(1);

    expect(
      deleteTask
    ).toHaveBeenCalledWith(5);

  });


  // Test 8: Do not delete when confirmation is cancelled
  it("should not delete task when deletion is cancelled", () => {

    const toggleComplete = vi.fn();
    const deleteTask = vi.fn();

    vi.spyOn(
      window,
      "confirm"
    ).mockReturnValue(false);

    const tasks = [
      {
        id: 5,
        title: "Keep This Task",
        priority: "Low",
        category: "Personal",
        completed: false
      }
    ];

    render(
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Delete"
      })
    );

    expect(
      window.confirm
    ).toHaveBeenCalled();

    expect(
      deleteTask
    ).not.toHaveBeenCalled();

  });

});