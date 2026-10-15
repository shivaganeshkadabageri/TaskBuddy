/**
 * @vitest-environment jsdom
 */

import {
  describe,
  expect,
  it,
  beforeEach
} from "vitest";

import {
  saveTasks,
  loadTasks,
  clearTasks
} from "../utils/storage";

describe("Task Storage Utilities", () => {

  beforeEach(() => {
    localStorage.clear();
  });


  it("should save tasks to localStorage", () => {

    const tasks = [
      {
        id: 1,
        title: "Learn React",
        priority: "High",
        category: "Work",
        completed: false
      }
    ];

    saveTasks(tasks);

    const storedTasks =
      JSON.parse(
        localStorage.getItem("taskbuddy_tasks")
      );

    expect(storedTasks).toEqual(tasks);
  });


  it("should load tasks from localStorage", () => {

    const tasks = [
      {
        id: 1,
        title: "Practice Java",
        priority: "Medium",
        category: "Personal",
        completed: true
      }
    ];

    localStorage.setItem(
      "taskbuddy_tasks",
      JSON.stringify(tasks)
    );

    const loadedTasks = loadTasks();

    expect(loadedTasks).toEqual(tasks);
  });


  it("should return empty array when no tasks are stored", () => {

    const loadedTasks = loadTasks();

    expect(loadedTasks).toEqual([]);
  });


  it("should clear tasks from localStorage", () => {

    const tasks = [
      {
        id: 1,
        title: "Complete Project",
        completed: false
      }
    ];

    saveTasks(tasks);

    clearTasks();

    expect(
      localStorage.getItem("taskbuddy_tasks")
    ).toBeNull();
  });


  it("should save multiple tasks correctly", () => {

    const tasks = [
      {
        id: 1,
        title: "Learn React",
        completed: false
      },
      {
        id: 2,
        title: "Practice Java",
        completed: true
      },
      {
        id: 3,
        title: "Prepare Interview",
        completed: false
      }
    ];

    saveTasks(tasks);

    const loadedTasks = loadTasks();

    expect(loadedTasks).toEqual(tasks);

    expect(loadedTasks.length).toBe(3);
  });

});