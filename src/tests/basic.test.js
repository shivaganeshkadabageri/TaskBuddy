import { describe, expect, it } from "vitest";

describe("Basic JavaScript Tests", () => {

  it("should add two numbers", () => {
    expect(2 + 3).toBe(5);
  });

  it("should compare strings", () => {
    expect("TaskBuddy").toBe("TaskBuddy");
  });

});