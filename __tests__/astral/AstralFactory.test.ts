import { Polyanet, Soloon } from "../../src/astral";
import { AstralFactory } from "../../src/astral/AstralFactory";
import { AstralObjectType } from "../../src/types";
import { describe, expect, test } from "@jest/globals";
describe("AstralFactory", () => {
  test("creates Polyanet without config", () => {
    const obj = AstralFactory.create(AstralObjectType.POLYANET);
    expect(obj).toBeInstanceOf(Polyanet);
  });

  test("creates Soloon with valid color", () => {
    const obj = AstralFactory.create(AstralObjectType.SOLOON, { color: "blue" });
    expect(obj).toBeInstanceOf(Soloon);
  });

  test("throws error for missing Soloon color", () => {
    expect(() => AstralFactory.create(AstralObjectType.SOLOON)).toThrow(
      "Color is required for Soloon"
    );
  });

  test("throws error for invalid object type", () => {
    expect(() => AstralFactory.create("invalid" as AstralObjectType)).toThrow(
      "Unknown astral object type: invalid"
    );
  });
});
