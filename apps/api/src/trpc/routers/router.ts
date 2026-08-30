import { router as mergeRouters } from "../init.js";
import { testRouter } from "./test/test.router.js";

export const rootRouter = mergeRouters({
  // Register your trpc router here to make it available
  test: testRouter,
});

export type RootRouter = typeof rootRouter;
