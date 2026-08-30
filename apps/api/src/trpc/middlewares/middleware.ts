// --------------------
// A place for reusable tRPC middlewares.
// --------------------

import { createMiddleware, TRPCError } from "../init.js";
import { auth } from "@/lib/auth.js";

/**
 * Adds currently active session data in the context (`opts.ctx.userSession`).
 *
 * Enables next middlewares to use session data confidently.
 *
 * @throws `TRPCError` if session expired or no valid session cookie found.
 */
export const authMiddleware = createMiddleware(async (opts) => {
  const session = await auth.api.getSession();
  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "no session cookie found or session expired",
    });
  }
  return opts.next({ ctx: { userSession: session } });
});
