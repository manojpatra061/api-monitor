// -------------------
// Note: server must be running.
// tRPC client can only send requests to a running server.
// -------------------

console.log(".script.ts file running...", "\n");

import "dotenv/config";
import { createTRPCClient, httpBatchLink, TRPCClientError } from "@trpc/client";
import type { TrpcAppRouter } from "../index.js";
// import { startServer } from "@/server.js";

async function getTrpcClient() {
  if (!process.env.API_URL) {
    console.log("Unable to load API_URL");
    return;
  }

  const url = `${process.env.API_URL}/api/trpc`;
  const trpcClient = createTRPCClient<TrpcAppRouter>({
    links: [httpBatchLink({ url })],
  });

  return trpcClient;
}

async function runProcedures() {
  try {
    const client = await getTrpcClient();

    const result = await client?.monitor.add.mutate({
      apiEndpoint: "https://dummyjson.com/test",
      intervalInSec: 3,
    });
    // const result = await client?.test.hi.query();

    console.log(result);
  } catch (error) {
    if (error instanceof TRPCClientError) {
      throw new Error("Something went wrong.");
    }
  }
}

// startServer(); // todo: rely on package.json's dev script
runProcedures();
