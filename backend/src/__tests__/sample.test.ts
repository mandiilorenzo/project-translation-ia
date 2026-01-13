import { describe, it, expect } from "@jest/globals";

describe("Test", () => {
  it("should sum 1 + 1", () => {
    expect(1 + 1).toBe(2);
  });

  it("should be able to run tests", () => {
    const project = "MedTranslate";
    expect(project).toContain("Med");
  });
});
