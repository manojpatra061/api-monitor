import { describe, expect, test, vi } from "vitest";
import { t, TRPCError } from "../../src/trpc/init.js";
import { authMiddleware } from "../../src/trpc/middlewares/index.js";
import { auth } from "@/lib/auth.js";

vi.mock(import("@/lib/auth.js"), async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    auth: {
      ...originalModule.auth,
      api: {
        ...originalModule.auth.api,
        getSession: vi.fn(),
      },
    },
  } as unknown as typeof originalModule;
});

describe("Auth check", () => {
  const userSession = {
    user: {
      id: "1",
      name: "mock user",
      email: "mock@user.com",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    session: {
      id: "1",
      userId: "1",
      token: "mock_token",
      expiresAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  const authCheck = t.procedure
    .use(authMiddleware)
    .query(({ ctx: { userSession } }) => {
      if (!userSession) {
        return false;
      }
      return true;
    });

  const testRouter = t.router({ authCheck });
  const createCaller = t.createCallerFactory(testRouter);

  test("should allow authenticated users", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(userSession);
    const caller = createCaller({});
    expect(await caller.authCheck()).toBe(true);
  });
  test.only("should reject unauthenticated users", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);
    const caller = createCaller({});
    await expect(caller.authCheck()).rejects.toThrow(TRPCError);
  });
});
