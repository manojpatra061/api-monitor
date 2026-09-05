import { expect, test, vi, describe } from "vitest";
import { addApiEndpointForUser, ApiEndpoint } from "./apiendpoint.model.js";
import { prisma } from "@/lib/prisma.js";

vi.mock(import("@/lib/prisma.js"), async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    prisma: {
      ...originalModule.prisma,
      apiEndpoint: {
        ...originalModule.prisma.apiEndpoint,
        create: vi.fn(),
      },
    },
  };
});

const mockedApiEndpoint: ApiEndpoint = {
  endpoint: "api.example.com",
  intervalInSec: 4,
  id: "123ABC",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "user123",
};

describe("addApiEndpointForUser", () => {
  test("should get api endpoint", async () => {
    vi.mocked(prisma.apiEndpoint.create).mockResolvedValue(mockedApiEndpoint);

    const { apiEndpoint } = await addApiEndpointForUser("123ABC", {
      endpoint: "api.example.com",
      intervalInSec: 4,
    });

    expect(apiEndpoint).toStrictEqual(mockedApiEndpoint);
  });
});
