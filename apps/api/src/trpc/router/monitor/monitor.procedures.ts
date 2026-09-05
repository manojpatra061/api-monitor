import { publicProcedure, t } from "../../init.js";
import { monitorController } from "@/controllers/index.js";
import type { AnyProcedure } from "@trpc/server";
// import { authMiddleware } from "../../middlewares/index.js";

const MonitorSchemaBase = monitorController.MonitorSchema.omit({
  userId: true,
});

const authMiddlewareMocked = t.middleware(async (opts) => {
  return opts.next({
    ctx: { userSession: { user: { id: "cmtn6rlu40000kdxvmovolr0l" } } },
  });
});

const addMonitor = publicProcedure
  .use(authMiddlewareMocked)
  .input(MonitorSchemaBase)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.userSession.user.id;
    const { apiEndpoint, intervalInSec } = input;
    const addedMonitorDetails = await monitorController.addMonitor({
      userId,
      apiEndpoint,
      intervalInSec,
    });
    return addedMonitorDetails;
  });

export const monitorProcedures = { add: addMonitor } satisfies Record<
  string,
  AnyProcedure
>;
