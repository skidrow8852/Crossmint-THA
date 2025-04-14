export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function validateMapDimensions(map: string[][]): void {
  const rowCount = map.length;
  if (rowCount === 0) throw new Error("Empty map provided");

  const colCount = map[0].length;
  if (!map.every((row) => row.length === colCount)) {
    throw new Error("Map has inconsistent column counts");
  }
}
