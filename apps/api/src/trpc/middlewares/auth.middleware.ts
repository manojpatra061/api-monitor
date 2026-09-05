import { t } from "../init.js";
import { TRPCError } from "@trpc/server";
import { auth, type Session } from "@/lib/auth.js";

/**
 * Adds currently active session data in the context (`opts.ctx.userSession`).
 *
 * Enables next middlewares to use session data confidently.
 *
 * @throws `TRPCError` if session expired or no valid session cookie found.
 */
export const authCheck = t.middleware(async (opts) => {
  const session: Session = await auth.api.getSession();
  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "no session cookie found or session expired",
    });
  }
  return opts.next({ ctx: { userSession: session } });
});
