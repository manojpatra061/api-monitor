import { apiEndpointModel } from "../data/models/index.js";

export async function addApiEndpointForUser({
  userId,
  apiEndpoint,
  intervalInSec,
}: {
  userId: string;
  apiEndpoint: string;
  intervalInSec: number;
}) {
  const addedEndpointWithMonitor = await apiEndpointModel.addApiEndpointForUser(
    userId,
    {
      endpoint: apiEndpoint,
      intervalInSec,
    },
  );
  return addedEndpointWithMonitor;
}

async function monitorApi(apiEndPoint: string, method: "GET" | "POST" = "GET") {
  const start = new Date();
  const res = await hitApi(apiEndPoint, method);
  const end = new Date();
  return {
    responseTimeInMs: end.getTime() - start.getTime(),
    success: res.ok,
    statusCode: res.status,
    checkedAt: new Date().toISOString(),
    errorMessage: res.ok ? null : `Response error: ${res.statusText}`,
  };
}

async function hitApi(apiEndPoint: string, method: "GET" | "POST" = "GET") {
  try {
    return await fetch(apiEndPoint, { method });
  } catch (error) {
    // todo: Create a separate error class. Suggestions: NetworkError, ApiError, HitError, etc.
    throw new Error(
      `Not able to hit the API endpoint "${apiEndPoint}" with "${method}" method.
${(error as Error).message}`,
    );
  }
}

// monitor
// apiendpoint -> lookup monitor table -> 
