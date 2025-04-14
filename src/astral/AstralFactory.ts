import { AstralObjectType, AstralObject, AstralObjectConfig } from "../types";
import { Polyanet, Soloon, Cometh } from ".";

export class AstralFactory {
  static create(type: AstralObjectType, config?: AstralObjectConfig): AstralObject {
    switch (type) {
      case AstralObjectType.POLYANET:
        return new Polyanet();
      case AstralObjectType.SOLOON:
        if (!config?.color) throw new Error("Color is required for Soloon");
        return new Soloon(config.color);
      case AstralObjectType.COMETH:
        if (!config?.direction) throw new Error("Direction is required for Cometh");
        return new Cometh(config.direction);
      default:
        throw new Error(`Unknown astral object type: ${type}`);
    }
  }
}
