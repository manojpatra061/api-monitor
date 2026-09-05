import * as z from "zod";
import { publicProcedure } from "../../init-core.js";
import type { AnyProcedure } from "@trpc/server";

const hi = publicProcedure.query(() => {
  return { message: "Hello!", type: "query" };
});

const myNameIs = publicProcedure.input(z.string()).query((arg) => {
  return { message: `Nice to meet you ${arg.input}!`, type: "query" };
});

const updateMyDetails = publicProcedure
  .input(z.object({ name: z.string(), age: z.number() }))
  .mutation((opts) => {
    return {
      message: "Your details have been updated",
      updatedDetails: opts.input,
      type: "mutation",
    };
  });

export const testProcedures = {
  hi,
  myNameIs,
  updateMyDetails,
} satisfies Record<string, AnyProcedure>;
