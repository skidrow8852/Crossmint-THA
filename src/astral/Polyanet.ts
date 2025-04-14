import { AstralObject } from "../types";
import { ApiClient } from "../api/ApiClient";

export class Polyanet implements AstralObject {
  private apiClient = new ApiClient();

  async create(row: number, column: number): Promise<void> {
    await this.apiClient.post("/polyanets", { row, column });
  }

  async delete(row: number, column: number): Promise<void> {
    await this.apiClient.delete("/polyanets", { row, column });
  }
}
