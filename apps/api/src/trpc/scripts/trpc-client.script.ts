// -------------------
// Note: server must be running.
// tRPC client can only send requests to a running server.
// -------------------

import "dotenv/config";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { TrpcAppRouter } from "../index.js";
import { startServer } from "@/server.js";

async function setup() {
  startServer(); // todo: rely on package.json script to start server. consideration: child_process
}

async function getTrpcClient() {
  setup();
  const url = `${process.env.API_URL}/api/trpc`;
  const trpcClient = createTRPCClient<TrpcAppRouter>({
    links: [httpBatchLink({ url })],
  });
  return trpcClient;
}

async function runProcedures() {
  const client = await getTrpcClient();
  const result = await client.test.hi.query();
  console.log(result);
}

runProcedures();
