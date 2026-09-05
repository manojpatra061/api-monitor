import { describe, expect, test, vi } from "vitest";
import { t } from "../../src/trpc/init.js";
import { TRPCError } from "@trpc/server";
import { authCheck } from "../../src/trpc/middlewares/index.js";
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
  const check = t.procedure.use(authCheck).query(({ ctx: { userSession } }) => {
    return userSession;
  });

  const tempRouter = t.router({ auth: { check } });
  const createCaller = t.createCallerFactory(tempRouter);

  test("should allow authenticated users", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(userSession);
    const caller = createCaller({});
    await expect(caller.auth.check()).resolves.toBe(userSession);
  });
  test("should reject unauthenticated users", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);
    const caller = createCaller({});
    await expect(caller.auth.check()).rejects.toThrow(TRPCError);
  });
});

// TODO: Should be db integrated instead of mocking. Considerations: separate db + entries + checking
