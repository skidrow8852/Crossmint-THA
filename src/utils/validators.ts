import { Color, Direction } from "../types";

export function validateColor(color: string): asserts color is Color {
  if (!["blue", "red", "purple", "white"].includes(color)) {
    throw new Error(`Invalid color: ${color}`);
  }
}

export function validateDirection(direction: string): asserts direction is Direction {
  if (!["up", "down", "left", "right"].includes(direction)) {
    throw new Error(`Invalid direction: ${direction}`);
  }
}
