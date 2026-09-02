import * as z from "zod";
import { publicProcedure } from "../../init.js";
import type { AnyProcedure } from "@trpc/server";

const testGet = publicProcedure.query(() => {
  return { message: "working..." };
});

const testGetWithArg = publicProcedure.input(z.string()).query((arg) => {
  return { message: `testGetWithArg working...`, arg: arg.input };
});

const testPost = publicProcedure
  .input(z.object({ arg: z.string() }))
  .mutation((opts) => {
    return { message: `testPost working... ${opts.input.arg}` };
  });

export const testProcedures = {
  testGet,
  testGetWithArg,
  testPost,
} satisfies Record<string, AnyProcedure>;
