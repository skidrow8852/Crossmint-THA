// Challnege 1 to draw Polyanets on Megaverse (11x11 matrix)
import axios from "axios";
import { generateXPattern } from "../helpers/draw";

// Load environment variables from .env file
import { config } from "dotenv";
config();

// Get the candidate ID from environment variables
const CANDIDATE_ID = process.env.CANDIDATE_ID;

// This function draws Polyanets on a matrix of given Megaverse size and posts the coordinates to the Polyanet API.
async function postPolyanet(row: number, column: number) {
  try {
    const response = await axios.post(
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

const size = 11;
generateXPattern(size, postPolyanet);
