import { DrawService } from "./services/DrawService";

async function main() {
  try {
    const drawService = new DrawService();

    // Phase 1: Draw X pattern
    console.log("Starting phase 1 placements...");
    await drawService.generateXPattern();

    // Cleanup before phase 2
    console.log("Cleaning up phase 1 Polyanets...");
    await drawService.deleteXPattern();

    // Phase 2: Place entities from goal map
    console.log("Starting phase 2 placements...");
    await drawService.placeEntitiesFromGoalMap();

    console.log("Megaverse creation completed!");
  } catch (error) {
    console.error("Megaverse creation failed:", error.message);
    process.exit(1);
  }
}

main();
