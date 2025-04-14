import { Polyanet } from "../../src/astral/Polyanet";
import { ApiClient } from "../../src/api/ApiClient";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

jest.mock("../../src/api/ApiClient");

describe("Polyanet", () => {
  let polyanet: Polyanet;
  const mockPost = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    (ApiClient as jest.Mock).mockImplementation(() => ({
      post: mockPost,
      delete: mockDelete,
    }));

    polyanet = new Polyanet();
  });

  test("create sends correct POST request", async () => {
    await polyanet.create(5, 5);
    expect(mockPost).toHaveBeenCalledWith("/polyanets", {
      row: 5,
      column: 5,
    });
  });

  test("delete sends correct DELETE request", async () => {
    await polyanet.delete(5, 5);
    expect(mockDelete).toHaveBeenCalledWith("/polyanets", {
      row: 5,
      column: 5,
    });
  });

  test("handles API errors gracefully", async () => {
    mockPost.mockRejectedValue(new Error("API Error") as never);
    await expect(polyanet.create(0, 0)).rejects.toThrow("API Error");
  });
});
