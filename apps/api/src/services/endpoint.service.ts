import type { ApiHitResult } from "./monitor.types.js";
import * as apiEndpointDb from "@/data/db/apiendpoint.db.js";

export const addApiEndpointForUser = async ({
  userId,
  apiEndpoint,
  intervalInSec,
}: {
  userId: string;
  apiEndpoint: string;
  intervalInSec: number;
}) => {
  const addedEndpointWithMonitor = await apiEndpointDb.addApiEndpointForUser(
    userId,
    {
      endpoint: apiEndpoint,
      intervalInSec,
    },
  );
  return addedEndpointWithMonitor;
};

// will check them later
const hitApi = async (
  apiEndPoint: string,
  method: "GET" | "POST" = "GET",
): Promise<ApiHitResult> => {
  let response: Response;
  const timeBeforeRes = new Date();
  try {
    response = await fetch(apiEndPoint, { method });
  } catch {
    throw new NetworkError("Network error while calling the API"); // NO NEED
  }
  return {
    responseTimeInMs: new Date().getTime() - timeBeforeRes.getTime(),
    success: response.ok,
    statusCode: response.status,
    checkedAt: new Date().toISOString(),
    errorMessage: response.ok ? null : `Response error: ${response.statusText}`,
  };
};

export const monitorApi = async (
  apiEndPoint: string,
  method: "GET" | "POST" = "GET",
) => {
  const result = await hitApi(apiEndPoint, method);
  //
  return;
};
