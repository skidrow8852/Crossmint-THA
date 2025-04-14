import { AstralObject, Color } from "../types";
import { ApiClient } from "../api/ApiClient";
import { validateColor } from "../utils/validators";

export class Soloon implements AstralObject {
  private apiClient = new ApiClient();

  constructor(private readonly color: Color) {
    validateColor(color);
  }

  async create(row: number, column: number): Promise<void> {
    await this.apiClient.post("/soloons", { row, column, color: this.color });
  }

  async delete(row: number, column: number): Promise<void> {
    await this.apiClient.delete("/soloons", { row, column });
  }
}
