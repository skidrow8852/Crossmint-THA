import axios from "axios";

// Load environment variables from .env file
import { config } from "dotenv";
import { delay } from "./draw";
import { Colors, Directions } from "./types";
config();

// Get the candidate ID from environment variables
const CANDIDATE_ID = process.env.CANDIDATE_ID;

// This function draws Polyanets on a matrix of given Megaverse size and posts the coordinates to the Polyanet API.
export async function postPolyanet(row: number, column: number): Promise<void> {
  try {
    await delay(1000); // Delay of 1s between requests
    await axios.post(
      "https://challenge.crossmint.io/api/polyanets",
      {
        row,
        column,
        candidateId: CANDIDATE_ID,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(`Successfully posted at (${row}, ${column})`);
  } catch (error) {
    console.error(`Failed to post at (${row}, ${column}):`, error);
  }
}

// This function posts a comETH at given coordinates with direction
export async function postComETH(row: number, column: number, direction: Directions) {
  try {
    await delay(1000); // Delay of 1s between requests
    await axios.post(
      "https://challenge.crossmint.io/api/comeths",
      { row, column, direction, candidateId: CANDIDATE_ID },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(`comETH placed at (${row}, ${column}) facing ${direction}`);
  } catch (error) {
    console.error(`Failed to place comETH at (${row}, ${column}):`, error);
  }
}

// This function posts a SOLoon at given coordinates with a color
export async function postSOLoon(row: number, column: number, color: Colors) {
  try {
    await delay(1000); // Delay of 1s between requests
    await axios.post(
      "https://challenge.crossmint.io/api/soloons",
      { row, column, color, candidateId: CANDIDATE_ID },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(`SOLoon placed at (${row}, ${column}) with color ${color}`);
  } catch (error) {
    console.error(`Failed to place SOLoon at (${row}, ${column}):`, error);
  }
}

// This function returns an array of all the coordinates of the Megaverse
export async function getAllCoordinates(): Promise<string[][]> {
  try {
    const response = await axios.get(`https://challenge.crossmint.io/api/map/${CANDIDATE_ID}/goal`);
    return response?.data?.goal;
  } catch (error) {
    console.error(`Failed to get the goal`, error);
  }
}
