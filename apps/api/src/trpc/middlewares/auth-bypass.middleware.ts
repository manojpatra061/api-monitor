import { t } from "../init.js";
import type { Session } from "@/lib/auth.js";

/**
 * Bypass authCheck and get a dummy session immediately.
 *
 * It adds session data in the context (`opts.ctx.userSession`).
 *
 * Caution: Do not use it in production.
 */
export const bypassAuthCheck = t.middleware(async (opts) => {
  const userSession: Session = {
    user: {
      // actual user from db
      id: "cmtn6rlu40000kdxvmovolr0l",
      name: "manoj patra",
      email: "manojpatra@gmail.com",
      emailVerified: false,
      createdAt: new Date("2026-09-04T16:46:25.612+00:00"),
      updatedAt: new Date("2026-09-04T16:46:25.612+00:00"),
      image: null,
    },
    session: {
      id: "IDK",
      token: "IDK",
      userId: "cmtn6rlu40000kdxvmovolr0l",
      updatedAt: new Date(),
      createdAt: new Date(),
      expiresAt: new Date(),
    },
  };
  return opts.next({ ctx: { userSession } });
});
