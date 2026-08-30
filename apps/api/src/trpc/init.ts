// ----------------------
// Exports methods for creating routers, middlewares, procedures, etc.
// Everything related to working with tRPC instance.
// ----------------------

import { initTRPC } from "@trpc/server";
import type { Context } from "./contexts/context.js";
export { TRPCError, type AnyProcedure } from "@trpc/server";

export const {
  router,
  procedure: publicProcedure,
  middleware: createMiddleware,
} = initTRPC.context<Context>().create();
