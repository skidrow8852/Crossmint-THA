// Helper function to draw a pattern for the Polyanet (based on the dimention of the matrix)
// 1st Challenge to draw Polyanets on Megaverse (11x11 matrix)
// Tried using the API call concurrently but it was hitting the rate limit, so i avoided it
import { config } from "dotenv";
import { postComETH, postPolyanet, postSOLoon } from "./apis";
import { Colors, Directions } from "./types";

// Load environment variables from .env file
config();

// Get the size from environment variables or default to 11
const size = parseInt(process.env.SIZE) ?? 11;

// This function generates an X pattern on a matrix of given size and posts the coordinates to the Polyanet API. (1st Phase)
export async function generateXPattern(
  callApiPolyanet: (row: number, column: number) => Promise<void>
) {
  if (size < 3) throw new Error("Size must be at least 3 to draw a pattern.");

  let start1 = { row: Math.floor(size / 4), col: Math.floor(size / 4) };
  let start2 = { row: Math.floor(size / 4), col: size - Math.floor(size / 4) - 1 };
  let start3 = { row: size - Math.floor(size / 4) - 1, col: Math.floor(size / 4) };
  let start4 = { row: size - Math.floor(size / 4) - 1, col: size - Math.floor(size / 4) - 1 };
  // const requests: Promise<void>[] = [];

  for (let i = 0; i <= size - Math.floor(size / 2); i++) {
    if (start1.row + i < size && start1.col + i < size) {
      await callApiPolyanet(start1.row + i, start1.col + i);
    }
    if (start2.row + i < size && start2.col - i >= 0) {
      await callApiPolyanet(start2.row + i, start2.col - i);
    }
    if (start3.row - i >= 0 && start3.col + i < size) {
      await callApiPolyanet(start3.row - i, start3.col + i);
    }
    if (start4.row - i >= 0 && start4.col - i >= 0) {
      await callApiPolyanet(start4.row - i, start4.col - i);
    }
  }

  //await Promise.all(requests);
}

// Delay function to avoind hitting the API rate limit
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Check if a POLYanet exists in any of the adjacent cells (up, down, left, right)
export function isAdjacentToPolyanet(map: string[][], row: number, col: number): boolean {
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    // Check if the new coordinates are within bounds
    if (newRow >= 0 && newRow < map.length && newCol >= 0 && newCol < map[0].length) {
      if (map[newRow][newCol] === "POLYANET") {
        return true;
      }
    }
  }
  return false;
}

// This function draws a pattern for Megaverse using SOLoons, Polyanet and comETHs
export async function placeEntitiesOnMap(map: string[][]) {
  const rowCount = map.length;
  const colCount = map[0].length;

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const entity = map[row][col];

      // POLYANET placement
      if (entity === "POLYANET") {
        try {
          await postPolyanet(row, col);
        } catch (error) {
          console.error(`Error placing POLYANET at (${row}, ${col}):`, error);
        }
      }

      // SOLoon placement: Check if adjacent to POLYANET
      else if (
        entity === "PURPLE_SOLOON" ||
        entity === "RED_SOLOON" ||
        entity === "BLUE_SOLOON" ||
        entity === "WHITE_SOLOON"
      ) {
        if (isAdjacentToPolyanet(map, row, col)) {
          const color = entity.split("_")[0].toLowerCase() as Colors;
          try {
            await postSOLoon(row, col, color);
          } catch (error) {
            console.error(`Error placing SOLoon at (${row}, ${col}):`, error);
          }
        } else {
          console.error(`SOLoon at (${row}, ${col}) is not adjacent to a POLYANET.`);
        }
      }

      // comETH placement: Ensure they have a direction
      else if (
        entity === "UP_COMETH" ||
        entity === "DOWN_COMETH" ||
        entity === "LEFT_COMETH" ||
        entity === "RIGHT_COMETH"
      ) {
        const direction = entity.split("_")[0].toLowerCase() as Directions;
        try {
          await postComETH(row, col, direction);
        } catch (error) {
          console.error(`Error placing comETH at (${row}, ${col}) facing ${direction}:`, error);
        }
      }
    }
  }

  console.log("Entities placed on the map.");
}
