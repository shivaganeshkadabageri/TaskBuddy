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

import TaskForm from "../components/TaskForm";


describe("TaskForm Component", () => {

  // Clean the DOM after every test
  afterEach(() => {
    cleanup();
  });


  // Test 1: Check whether TaskForm renders correctly
  it("should render the task form", () => {

    const addTask = vi.fn();

    render(
      <TaskForm
        addTask={addTask}
        tasks={[]}
      />
    );

    expect(
      screen.getByText("Add New Task")
    ).toBeTruthy();

    expect(
      screen.getByPlaceholderText("Enter your task")
    ).toBeTruthy();

    expect(
      screen.getByTestId("add-task-button")
    ).toBeTruthy();

  });


  // Test 2: Add a valid task
  it("should add a valid task", () => {

    const addTask = vi.fn();

    render(
      <TaskForm
        addTask={addTask}
        tasks={[]}
      />
    );

    const input = screen.getByPlaceholderText(
      "Enter your task"
    );

    fireEvent.change(input, {
      target: {
        value: "Learn React"
      }
    });

    fireEvent.click(
      screen.getByTestId("add-task-button")
    );

    expect(addTask).toHaveBeenCalledTimes(1);

    expect(addTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Learn React",
        priority: "Medium",
        category: "General",
        completed: false
      })
    );

  });


  // Test 3: Reject an empty task
  it("should reject an empty task", () => {

    const addTask = vi.fn();

    render(
      <TaskForm
        addTask={addTask}
        tasks={[]}
      />
    );

    fireEvent.click(
      screen.getByTestId("add-task-button")
    );

    expect(
      screen.getByText("Please enter a task.")
    ).toBeTruthy();

    expect(addTask).not.toHaveBeenCalled();

  });


  // Test 4: Reject spaces-only task
  it("should reject a spaces-only task", () => {

    const addTask = vi.fn();

    render(
      <TaskForm
        addTask={addTask}
        tasks={[]}
      />
    );

    const input = screen.getByPlaceholderText(
      "Enter your task"
    );

    fireEvent.change(input, {
      target: {
        value: "     "
      }
    });

    fireEvent.click(
      screen.getByTestId("add-task-button")
    );

    expect(
      screen.getByText("Please enter a task.")
    ).toBeTruthy();

    expect(addTask).not.toHaveBeenCalled();

  });


  // Test 5: Reject duplicate task
  it("should reject a duplicate task", () => {

    const addTask = vi.fn();

    const tasks = [
      {
        id: 1,
        title: "Learn React",
        priority: "Medium",
        category: "General",
        completed: false
      }
    ];

    render(
      <TaskForm
        addTask={addTask}
        tasks={tasks}
      />
    );

    const input = screen.getByPlaceholderText(
      "Enter your task"
    );

    fireEvent.change(input, {
      target: {
        value: "learn react"
      }
    });

    fireEvent.click(
      screen.getByTestId("add-task-button")
    );

    expect(
      screen.getByText("This task already exists.")
    ).toBeTruthy();

    expect(addTask).not.toHaveBeenCalled();

  });


  // Test 6: Check priority selection
  it("should add a task with selected priority", () => {

    const addTask = vi.fn();

    render(
      <TaskForm
        addTask={addTask}
        tasks={[]}
      />
    );

    const input = screen.getByPlaceholderText(
      "Enter your task"
    );

    fireEvent.change(input, {
      target: {
        value: "Prepare Java Interview"
      }
    });

    const prioritySelect = screen.getByLabelText(
      "Priority"
    );

    fireEvent.change(prioritySelect, {
      target: {
        value: "High"
      }
    });

    fireEvent.click(
      screen.getByTestId("add-task-button")
    );

    expect(addTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Prepare Java Interview",
        priority: "High"
      })
    );

  });


  // Test 7: Check category selection
  it("should add a task with selected category", () => {

    const addTask = vi.fn();

    render(
      <TaskForm
        addTask={addTask}
        tasks={[]}
      />
    );

    const input = screen.getByPlaceholderText(
      "Enter your task"
    );

    fireEvent.change(input, {
      target: {
        value: "Complete Project"
      }
    });

    const categorySelect = screen.getByLabelText(
      "Category"
    );

    fireEvent.change(categorySelect, {
      target: {
        value: "Work"
      }
    });

    fireEvent.click(
      screen.getByTestId("add-task-button")
    );

    expect(addTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Complete Project",
        category: "Work"
      })
    );

  });

});