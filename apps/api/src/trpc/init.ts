// ----------------------
// Exports methods for creating routers, middlewares, procedures, etc.
// Everything related to working with tRPC instance.
// ----------------------

import { initTRPC } from "@trpc/server";
import type { Context } from "./contexts/context.js";
export { TRPCError, type AnyProcedure } from "@trpc/server";

// tRPC instance
export const t = initTRPC.context<Context>().create();

export const {
  router: createRouter,
  procedure: publicProcedure,
  middleware: createMiddleware,
} = t;

type Router = { routeSegment: string; router: ReturnType<typeof t.router> };
type RouterCollection<T extends readonly Router[]> = {
  [R in T[number] as R["routeSegment"]]: R["router"];
};

export function mergeRouters<const TRouters extends readonly Router[]>(
  routers: TRouters,
) {
  const routerCollection = {} as RouterCollection<TRouters>;
  routers.forEach(({ routeSegment, router }) => {
    routerCollection[routeSegment as keyof RouterCollection<TRouters>] =
      router as never;
  });
  return t.router(routerCollection);
}
