import { AstralObject, Direction } from "../types";
import { ApiClient } from "../api/ApiClient";
import { validateDirection } from "../utils/validators";

export class Cometh implements AstralObject {
  private apiClient = new ApiClient();

  constructor(private readonly direction: Direction) {
    validateDirection(direction);
  }

  async create(row: number, column: number): Promise<void> {
    await this.apiClient.post("/comeths", { row, column, direction: this.direction });
  }

  async delete(row: number, column: number): Promise<void> {
    await this.apiClient.delete("/comeths", { row, column });
  }
}
