// ----------------------
// Exports methods for creating routers, middlewares, procedures, etc.
// Everything related to working with tRPC instance.
// ----------------------

import { initTRPC } from "@trpc/server";
import type { Context } from "./contexts/context.js";

// tRPC instance
export const t = initTRPC.context<Context>().create();
export const {
  router: createRouter,
  procedure: publicProcedure,
  middleware: createMiddleware,
} = t;
