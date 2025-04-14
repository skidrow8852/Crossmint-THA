export enum AstralObjectType {
  POLYANET = "polyanet",
  SOLOON = "soloon",
  COMETH = "cometh",
}

export type Direction = "up" | "down" | "left" | "right";
export type Color = "blue" | "red" | "purple" | "white";

export interface AstralObject {
  create(row: number, column: number): Promise<void>;
  delete(row: number, column: number): Promise<void>;
}

export interface AstralObjectConfig {
  color?: Color;
  direction?: Direction;
}
