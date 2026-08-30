## Using tRPC with Express

- tRPC adds an API layer on top of Express.
- A type-safe way for the frontend to call backend functions over HTTP without manually using endpoints or fetch.

## How to use

- Import `trpc` from `index.ts` and use it as a route handler for an express route (ex: `"/trpc"`).