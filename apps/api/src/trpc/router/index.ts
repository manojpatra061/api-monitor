import { t } from "../init.js";
import { testRouter } from "./test/test.router.js";

// Register your trpc router here to make it available
export const trpcAppRouter = mergeRouters([
  { routeSegment: "test", router: testRouter },
]);

export type TrpcAppRouter = typeof trpcAppRouter;

// -------- Helpers ------------

type Router = { routeSegment: string; router: ReturnType<typeof t.router> };
type RouterCollection<T extends readonly Router[]> = {
  [R in T[number] as R["routeSegment"]]: R["router"];
};
function mergeRouters<const TRouters extends readonly Router[]>(
  routers: TRouters,
) {
  const routerCollection = {} as RouterCollection<TRouters>;
  routers.forEach(({ routeSegment, router }) => {
    routerCollection[routeSegment as keyof RouterCollection<TRouters>] =
      router as never;
  });
  return t.router(routerCollection);
}
