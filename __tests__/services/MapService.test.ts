import { MapService } from "../../src/services/MapService";
import { ApiClient } from "../../src/api/ApiClient";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
jest.mock("../../src/api/ApiClient");

describe("MapService", () => {
  let mapService: MapService;
  const mockGet = jest.fn();

  beforeEach(() => {
    (ApiClient as jest.Mock).mockImplementation(() => ({
      get: mockGet,
    }));

    mapService = new MapService();
  });

  test("fetches goal map correctly", async () => {
    const mockData = { goal: [[["POLYANET"]]] };
    mockGet.mockResolvedValue({ data: mockData } as never);

    const result = await mapService.getGoalMap();
    expect(result).toEqual(mockData.goal);
  });

  test("throws error on API failure", async () => {
    mockGet.mockRejectedValue(new Error("API Error") as never);
    await expect(mapService.getGoalMap()).rejects.toThrow("API Error");
  });
});
