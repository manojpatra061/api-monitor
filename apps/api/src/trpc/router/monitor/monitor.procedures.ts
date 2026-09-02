import { publicProcedure } from "../../init.js";
import * as monitorController from "@/controllers/monitor.controller.js";
import type { AnyProcedure } from "@trpc/server";
import { authMiddleware } from "../../middlewares/index.js";

export const monitorProcedures: Record<string, AnyProcedure> = {};

monitorProcedures.addMonitor = publicProcedure
  .use(authMiddleware)
  .input(monitorController.MonitorSchema)
  .mutation(async ({ input, ctx }) => {
    const {
      userSession: {
        user: { id: userId },
      },
    } = ctx;
    const { apiEndpoint, intervalInSec } = input;
    const addedMonitorDetails = await monitorController.addMonitor({
      userId,
      apiEndpoint,
      intervalInSec,
    });
    return addedMonitorDetails;
  });
