// ----------------------
// Exports the tRPC instance.
// ----------------------

import { initTRPC } from "@trpc/server";
import type { Context } from "./contexts/context.js";

export const t = initTRPC.context<Context>().create();
