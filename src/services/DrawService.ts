import { AstralFactory } from "../astral/AstralFactory";
import { AstralObjectType, Color, Direction } from "../types";
import { logger } from "../utils/logger";
import { config } from "../utils/config";
import { delay } from "../utils/helpers";
import { MapService } from "./MapService";

export class DrawService {
  private astralFactory = AstralFactory;
  private delayBetweenRequests = config.DELAY;
  private cachedMap: any[][] = [];

  async generateXPattern(size: number = 11): Promise<void> {
    if (size < 3) throw new Error("Size must be at least 3 to draw a pattern.");

    const polyanet = this.astralFactory.create(AstralObjectType.POLYANET);
    const quarter = Math.floor(size / 4);

    for (let i = 0; i <= size - Math.floor(size / 2); i++) {
      await this.drawPatternSegment(polyanet, quarter + i, quarter + i);
      await this.drawPatternSegment(polyanet, quarter + i, size - quarter - 1 - i);
      await this.drawPatternSegment(polyanet, size - quarter - 1 - i, quarter + i);
      await this.drawPatternSegment(polyanet, size - quarter - 1 - i, size - quarter - 1 - i);

      await delay(this.delayBetweenRequests);
    }
  }

  private async drawPatternSegment(
    polyanet: ReturnType<typeof AstralFactory.create>,
    row: number,
    col: number
  ): Promise<void> {
    try {
      if (row < config.MAP_SIZE && col < config.MAP_SIZE) {
        await polyanet.create(row, col);
        logger.info(`Created Polyanet at (${row}, ${col})`);
      }
    } catch (error) {
      logger.error(`Failed to create Polyanet at (${row}, ${col}): ${error.message}`);
    }
  }

  async deleteXPattern(size: number = config.MAP_SIZE): Promise<void> {
    if (size < 3) throw new Error("Size must be at least 3 to delete a pattern.");

    const polyanet = this.astralFactory.create(AstralObjectType.POLYANET);
    const quarter = Math.floor(size / 4);

    for (let i = 0; i <= size - Math.floor(size / 2); i++) {
      await this.deletePatternSegment(polyanet, quarter + i, quarter + i),
        await this.deletePatternSegment(polyanet, quarter + i, size - quarter - 1 - i),
        await this.deletePatternSegment(polyanet, size - quarter - 1 - i, quarter + i),
        await this.deletePatternSegment(polyanet, size - quarter - 1 - i, size - quarter - 1 - i);

      await delay(this.delayBetweenRequests);
    }
  }

  private async deletePatternSegment(
    polyanet: ReturnType<typeof AstralFactory.create>,
    row: number,
    col: number
  ): Promise<void> {
    try {
      if (row < config.MAP_SIZE && col < config.MAP_SIZE) {
        await polyanet.delete(row, col);
        logger.info(`Deleted Polyanet at (${row}, ${col})`);
      }
    } catch (error) {
      logger.error(`Failed to delete Polyanet at (${row}, ${col}): ${error.message}`);
    }
  }

  async placeEntitiesFromGoalMap(): Promise<void> {
    const mapService = new MapService();
    this.cachedMap = await mapService.getGoalMap();

    for (let row = 0; row < this.cachedMap.length; row++) {
      for (let col = 0; col < this.cachedMap[row].length; col++) {
        await this.processMapCell(this.cachedMap[row][col], row, col);
        await delay(this.delayBetweenRequests);
      }
    }
  }

  private async processMapCell(entity: string, row: number, col: number): Promise<void> {
    try {
      const [type, modifier] = entity.split("_");
      const normalizedType = type.toLowerCase();

      switch (normalizedType) {
        case AstralObjectType.POLYANET:
          await this.handlePolyanet(row, col);
          break;
        case "soloon":
          await this.handleSoloon(row, col, modifier?.toLowerCase() as Color);
          break;
        case "cometh":
          await this.handleCometh(row, col, modifier?.toLowerCase() as Direction);
          break;
      }
    } catch (error) {
      logger.error(`Error processing cell (${row}, ${col}): ${error.message}`);
    }
  }

  private async handlePolyanet(row: number, col: number): Promise<void> {
    const polyanet = this.astralFactory.create(AstralObjectType.POLYANET);
    await polyanet.create(row, col);
    logger.info(`Created Polyanet at (${row}, ${col})`);
  }

  private async handleSoloon(row: number, col: number, color: Color): Promise<void> {
    if (!this.isAdjacentToPolyanet(row, col)) {
      throw new Error(`SOLoon at (${row}, ${col}) is not adjacent to a POLYANET`);
    }

    const soloon = this.astralFactory.create(AstralObjectType.SOLOON, { color });
    await soloon.create(row, col);
    logger.info(`Created SOLoon at (${row}, ${col}) with color ${color}`);
  }

  private async handleCometh(row: number, col: number, direction: Direction): Promise<void> {
    const cometh = this.astralFactory.create(AstralObjectType.COMETH, { direction });
    await cometh.create(row, col);
    logger.info(`Created COMeth at (${row}, ${col}) with direction ${direction}`);
  }

  private isAdjacentToPolyanet(row: number, col: number): boolean {
    const directions = [
      [-1, 0], // up
      [1, 0], // down
      [0, -1], // left
      [0, 1], // right
    ];

    return directions.some(([dx, dy]) => {
      const x = row + dx;
      const y = col + dy;
      return (
        x >= 0 &&
        x < this.cachedMap.length &&
        y >= 0 &&
        y < (this.cachedMap[0]?.length || 0) &&
        this.cachedMap[x][y]
      );
    });
  }
}
