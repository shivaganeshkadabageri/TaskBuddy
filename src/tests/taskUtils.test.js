import {
  describe,
  expect,
  it
} from "vitest";

import {
  isValidTask,
  isDuplicateTask,
  calculateProgress
} from "../utils/taskUtils";

describe("Task Utilities", () => {

  describe("isValidTask", () => {

    it("should accept a valid task", () => {
      expect(
        isValidTask("Learn React")
      ).toBe(true);
    });

    it("should reject an empty task", () => {
      expect(
        isValidTask("")
      ).toBe(false);
    });

    it("should reject spaces-only task", () => {
      expect(
        isValidTask("     ")
      ).toBe(false);
    });

  });

  describe("isDuplicateTask", () => {

    const tasks = [
      {
        id: 1,
        title: "Learn React",
        completed: false
      },
      {
        id: 2,
        title: "Practice Java",
        completed: false
      }
    ];

    it("should detect duplicate task", () => {
      expect(
        isDuplicateTask("Learn React", tasks)
      ).toBe(true);
    });

    it("should detect duplicate regardless of case", () => {
      expect(
        isDuplicateTask("learn react", tasks)
      ).toBe(true);
    });

    it("should allow a new task", () => {
      expect(
        isDuplicateTask("Learn SQL", tasks)
      ).toBe(false);
    });

  });

  describe("calculateProgress", () => {

    it("should return 0 when there are no tasks", () => {
      expect(
        calculateProgress([])
      ).toBe(0);
    });

    it("should return 50 when half the tasks are completed", () => {

      const tasks = [
        {
          id: 1,
          title: "Task 1",
          completed: true
        },
        {
          id: 2,
          title: "Task 2",
          completed: false
        }
      ];

      expect(
        calculateProgress(tasks)
      ).toBe(50);
    });

    it("should return 100 when all tasks are completed", () => {

      const tasks = [
        {
          id: 1,
          title: "Task 1",
          completed: true
        },
        {
          id: 2,
          title: "Task 2",
          completed: true
        }
      ];

      expect(
        calculateProgress(tasks)
      ).toBe(100);
    });

  });

});