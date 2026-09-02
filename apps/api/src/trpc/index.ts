import * as trpcExpress from "@trpc/server/adapters/express";
import { trpcAppRouter } from "./router/index.js";
import { createContext } from "./contexts/context.js";

export type { TrpcAppRouter } from "./router/index.js";
export const trpc = trpcExpress.createExpressMiddleware({
  router: trpcAppRouter,
  createContext,
});
