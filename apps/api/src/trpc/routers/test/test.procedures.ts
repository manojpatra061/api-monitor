import * as z from "zod";
import { publicProcedure } from "../../init.js";
import { authMiddleware } from "../../middlewares/index.js";
import type { AnyProcedure } from "@trpc/server";

export const testProcedures: Record<string, AnyProcedure> = {};

testProcedures.testGet = publicProcedure.use(authMiddleware).query(() => {
  return { message: "working..." };
});

testProcedures.testGetWithArg = publicProcedure
  .input(z.string())
  .query((arg) => {
    return { message: `testGetWithArg working...`, arg: arg.input };
  });

testProcedures.testPost = publicProcedure
  .input(z.object({ arg: z.string() }))
  .mutation((opts) => {
    return { message: `testPost working... ${opts.input.arg}` };
  });
