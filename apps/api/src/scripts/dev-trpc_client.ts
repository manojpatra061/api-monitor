// -------------------
// Note: server must be running.
// tRPC client can only send requests to a running server.
// -------------------

import "dotenv/config";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { TrpcAppRouter } from "../index.js";
import { startServer } from "../server.js";

startServer(); // todo: rely on package.json script to start server. consideration: child_process
const url = `${process.env.API_URL}/api/trpc`;
const client = createTRPCClient<TrpcAppRouter>({
  links: [httpBatchLink({ url })],
});

async function execute(x: Promise<any>) {
  const result = await x;
  console.log(result);
}

// execute(client.test.hi.query());
