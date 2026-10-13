import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { TrpcAppRouter } from "@repo/api/src/index"; //todo: just @repo/api

export const trpcClient = createTRPCClient<TrpcAppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_API_URL}/trpc`,
    }),
  ],
});
