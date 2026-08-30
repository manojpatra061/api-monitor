import { expect, test, vi } from "vitest";
import { addApiEndpointForUser } from "./apiendpoint.db.js";
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

test("should run addApiEndpointForUser fn", async () => {
  const rv = {
    endpoint: "api.example.com",
    intervalInSec: 4,
    id: "123ABC",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user123",
  };

  vi.mocked(prisma.apiEndpoint.create).mockResolvedValue(rv);

  const addedApiEndpoint = await addApiEndpointForUser("123ABC", {
    endpoint: "",
    intervalInSec: 4,
  });

  expect(addedApiEndpoint).toBe(rv);
});
