/**
 * @vitest-environment jsdom
 */

import {
  render,
  screen,
  cleanup
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
  afterEach
} from "vitest";

import ProgressTracker from "../components/ProgressTracker";

describe("ProgressTracker Component", () => {

  afterEach(() => {
    cleanup();
  });

  it("should show 0% when there are no tasks", () => {

    render(
      <ProgressTracker tasks={[]} />
    );

    expect(
      screen.getByText("0%")
    ).toBeTruthy();

    expect(
      screen.getByText("0 of 0 tasks completed")
    ).toBeTruthy();
  });


  it("should show 0% when no tasks are completed", () => {

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

    render(
      <ProgressTracker tasks={tasks} />
    );

    expect(
      screen.getByText("0%")
    ).toBeTruthy();

    expect(
      screen.getByText("0 of 2 tasks completed")
    ).toBeTruthy();
  });


  it("should show 50% when half of the tasks are completed", () => {

    const tasks = [
      {
        id: 1,
        title: "Learn React",
        completed: true
      },
      {
        id: 2,
        title: "Practice Java",
        completed: false
      }
    ];

    render(
      <ProgressTracker tasks={tasks} />
    );

    expect(
      screen.getByText("50%")
    ).toBeTruthy();

    expect(
      screen.getByText("1 of 2 tasks completed")
    ).toBeTruthy();
  });


  it("should show 100% when all tasks are completed", () => {

    const tasks = [
      {
        id: 1,
        title: "Learn React",
        completed: true
      },
      {
        id: 2,
        title: "Practice Java",
        completed: true
      }
    ];

    render(
      <ProgressTracker tasks={tasks} />
    );

    expect(
      screen.getByText("100%")
    ).toBeTruthy();

    expect(
      screen.getByText("2 of 2 tasks completed")
    ).toBeTruthy();
  });


  it("should calculate rounded progress correctly", () => {

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
      },
      {
        id: 3,
        title: "Task 3",
        completed: false
      }
    ];

    render(
      <ProgressTracker tasks={tasks} />
    );

    expect(
      screen.getByText("33%")
    ).toBeTruthy();

    expect(
      screen.getByText("1 of 3 tasks completed")
    ).toBeTruthy();
  });

});