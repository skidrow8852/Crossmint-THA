import { validateColor, validateDirection } from "../../src/utils/validators";
import { describe, expect, test } from "@jest/globals";

describe("Validators", () => {
  describe("validateColor", () => {
    test("allows valid colors", () => {
      expect(() => validateColor("blue")).not.toThrow();
    });

    test("throws for invalid colors", () => {
      expect(() => validateColor("invalid")).toThrow("Invalid color");
    });
  });

  describe("validateDirection", () => {
    test("allows valid directions", () => {
      expect(() => validateDirection("up")).not.toThrow();
    });

    test("throws for invalid directions", () => {
      expect(() => validateDirection("invalid")).toThrow("Invalid direction");
    });
  });
});
