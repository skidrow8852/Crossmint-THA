// Challnege 1 to draw Polyanets on Megaverse (11x11 matrix)
import axios from "axios";
import { generateXPattern } from "../helpers/draw";

const CANDIDATE_ID = "";

async function defaultPostPolyanet(row: number, column: number) {
  try {
    const response = await axios.post(
      "/api/polyanets",
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
generateXPattern(size, defaultPostPolyanet);
