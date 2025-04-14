import axios from "axios";
import { ApiClient } from "../../src/api/ApiClient";
import { config } from "../../src/utils/config";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

jest.mock("axios");

describe("ApiClient", () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;
  let apiClient: ApiClient;
  let mockInstance: {
    post: jest.Mock;
    interceptors: { response: { use: jest.Mock } };
  };
  beforeEach(() => {
    jest.clearAllMocks();

    mockInstance = {
      post: jest.fn(),
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
    };

    mockAxios.create.mockReturnValue(mockInstance as any);
    apiClient = new ApiClient();
  });

  test("sets base URL and headers", () => {
    expect(mockAxios.create).toHaveBeenCalledWith({
      baseURL: config.API_BASE_URL,
      headers: { "Content-Type": "application/json" },
    });
  });

  test("POST includes candidate ID", async () => {
    mockInstance.post.mockResolvedValue({ status: 200 } as never);
    await apiClient.post("/test", { row: 1, column: 1 });
    expect(mockInstance.post).toHaveBeenCalledWith(
      "/test",
      expect.objectContaining({ candidateId: config.CANDIDATE_ID })
    );
  });
});
