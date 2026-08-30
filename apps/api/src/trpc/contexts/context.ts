import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { Session } from "@/lib/auth.js";

export type Context = { userSession?: Session };

// created for each request
export const createContext = ({
  req,
  res,
}: CreateExpressContextOptions): Context => ({}); // no context
