import {
  monitorModel,
  monitorResult,
  apiEndpointModel,
  userModel,
} from "@/data/models/index.js";
import { AppError } from "@/errors/AppError.js";
import dayjs, { Dayjs } from "dayjs";

export async function monitor({
  userId,
  intervalInSec,
  endpointUrl,
}: {
  userId: userModel.User["id"];
  endpointUrl: apiEndpointModel.ApiEndpointBase["endpoint"];
  intervalInSec: apiEndpointModel.ApiEndpointBase["intervalInSec"];
}): Promise<Omit<monitorResult.MonitorResultBase, "monitorId">> {
  // save
  let { apiEndpoint, monitor } = await saveInfo({
    userId,
    apiInfo: { intervalInSec, endpoint: endpointUrl },
  });
  // update isRunning -> true
  if (!monitor.isRunning) {
    const runningMonitor = await monitorModel.update(apiEndpoint.id, {
      isRunning: true,
    });
    monitor = runningMonitor;
  }
  // find monitor - skip

  // hit

  // save result
}

/**
 * Hit an url (api-endpoint) and get a result object.
 *
 * @param url api-endpoint to hit
 * @param method http verb
 * @returns result object
 * @throws AppError
 */
export async function hitUrl(
  url: string,
  method: monitorModel.MonitorBase["method"] = "GET",
): Promise<
  Pick<
    monitorResult.MonitorResultBase,
    "success" | "statusCode" | "checkedAt" | "errorMessage" | "responseTimeInMs"
  >
> {
  try {
    const start = dayjs();
    const res = await fetch(url, { method });
    return {
      success: res.ok,
      responseTimeInMs: dayjs().diff(start, "ms"),
      checkedAt: new Date(),
      statusCode: res.status,
      errorMessage: res.ok ? null : res.statusText,
    };
  } catch (error) {
    throw new AppError({
      message: "Unable to hit the url",
      opts: { cause: error },
    });
  }
}

/**
 * Save api information.
 *
 * @param information
 * @returns saved information of apiendpoint and monitor
 * @throws AppError
 */
async function saveInfo({
  userId,
  apiInfo,
}: {
  userId: userModel.User["id"];
  apiInfo: Pick<apiEndpointModel.ApiEndpointBase, "endpoint" | "intervalInSec">;
}): Promise<{
  apiEndpoint: apiEndpointModel.ApiEndpointBase & {
    id: apiEndpointModel.ApiEndpoint["id"];
  };
  monitor: monitorModel.MonitorBase;
}> {
  try {
    const { apiEndpoint, monitor } =
      await apiEndpointModel.addApiEndpointForUser(userId, apiInfo);
    return {
      apiEndpoint,
      monitor: monitor ?? (await monitorModel.create(apiEndpoint.id)),
    };
  } catch (error) {
    throw new AppError({
      message: "Unable to save api information.",
      opts: { cause: error },
    });
  }
}

// async function hitAutomatic(url: string, intervalInSec: ) {

// }
