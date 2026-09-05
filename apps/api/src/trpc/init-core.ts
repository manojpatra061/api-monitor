import { t } from "./init.js";
import { authCheck } from "./middlewares/index.js";
import { bypassAuthCheck } from "./middlewares/auth-bypass.middleware.js";

export const {
  router: createRouter,
  procedure: publicProcedure,
  middleware: createMiddleware,
} = t;

export const protectedProcedure = t.procedure.use(
  process.env.NODE_ENV === "development" &&
    process.env.DEV_AUTH_BYPASS === "true"
    ? bypassAuthCheck
    : authCheck,
);
