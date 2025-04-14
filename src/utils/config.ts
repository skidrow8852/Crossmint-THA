import dotenv from "dotenv";
dotenv.config();

export const config = {
  API_BASE_URL: process.env.API_BASE_URL || "https://challenge.crossmint.io/api",
  CANDIDATE_ID: process.env.CANDIDATE_ID || "lol123456",
  MAX_RETRIES: parseInt(process.env.MAX_RETRIES || "3"),
  MAP_SIZE: parseInt(process.env.MAP_SIZE || "11"),
  DELAY: parseInt(process.env.DELAY || "1000"),
};
