// -------------------
// Note: server must be running.
// tRPC client can only send requests to a running server.
// -------------------

import "dotenv/config";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { TrpcAppRouter } from "../index.js";

async function run() {
  const url = `${process.env.API_URL}/api/trpc`;
  const client = createTRPCClient<TrpcAppRouter>({
    links: [httpBatchLink({ url })],
  });

  const result = await client.test.testGet.query();
  console.log(result);
}

run();
