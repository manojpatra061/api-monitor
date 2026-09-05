import { protectedProcedure } from "../../init-core.js";
import { monitorController } from "@/controllers/index.js";
import type { AnyProcedure } from "@trpc/server";

const MonitorSchemaBase = monitorController.MonitorSchema.omit({
  userId: true,
});

const addMonitor = protectedProcedure
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
