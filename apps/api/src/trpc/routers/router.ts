import { mergeRouters } from "../init.js";
import { testRouter } from "./test/test.router.js";

// Register your trpc router here to make it available
export const rootRouter = mergeRouters([
  { routeSegment: "test", router: testRouter },
]);

export type RootRouter = typeof rootRouter;
