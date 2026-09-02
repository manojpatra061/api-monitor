import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { TrpcAppRouter } from "../index.js";
import { t } from "../trpc/init.js";
import { trpcAppRouter } from "../trpc/router/index.js";

const client = createTRPCClient<TrpcAppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3000" })],
});

const createCaller = t.createCallerFactory(trpcAppRouter);

// createCaller().test.