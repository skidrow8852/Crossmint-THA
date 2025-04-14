import { ApiClient } from "../api/ApiClient";
import { config } from "../utils/config";
import { logger } from "../utils/logger";
import { AstralObjectType } from "../types";

export class MapService {
  private apiClient = new ApiClient();

  async getGoalMap(): Promise<AstralObjectType[][]> {
    try {
      const response = await this.apiClient.get(`/map/${config.CANDIDATE_ID}/goal`);
      return response.data.goal;
    } catch (error) {
      logger.error("Failed to fetch goal map");
      throw error;
    }
  }
}
