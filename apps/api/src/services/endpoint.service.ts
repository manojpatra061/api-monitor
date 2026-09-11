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
