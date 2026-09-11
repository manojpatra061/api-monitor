import { DatabaseError } from "@/errors/DatabaseError.js";
import { prisma, type MonitorResult } from "@/lib/prisma.js";

export type { MonitorResult } from "@/lib/prisma.js";

export type MonitorResultBase = Pick<
  MonitorResult,
  | "monitorId"
  | "success"
  | "responseTimeInMs"
  | "statusCode"
  | "checkedAt"
  | "errorMessage"
>;

/**
 * Adds monitor result.
 * @param result monitor's result
 * @returns newly added result
 */
export async function add(
  monitorId: MonitorResultBase["monitorId"],
  monitorResult: Omit<MonitorResultBase, "monitorId">,
): Promise<MonitorResult> {
  try {
    return await prisma.monitorResult.create({
      data: { ...monitorResult, monitor: { connect: { id: monitorId } } },
    });
  } catch (error) {
    throw new DatabaseError({
      message: "Unable to add the monitor result into the db table.",
      metadata: { query: "prisma.monitorResult.create()" },
      opts: { cause: error },
    });
  }
}
