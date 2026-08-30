import * as trpcExpress from "@trpc/server/adapters/express";
import { rootRouter } from "./routers/router.js";
import { createContext } from "./contexts/context.js";

export const trpc = trpcExpress.createExpressMiddleware({
  router: rootRouter,
  createContext,
});
