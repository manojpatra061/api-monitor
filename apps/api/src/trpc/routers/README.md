# Router creation guide

- `init.ts` exports methods (like `router`, `publicProcedure`) for creating routers.
- After you've created a router, _**register the router**_ by passing it in `mergeRouters` in `router.ts`. Skipping this step won't make your router available.
  ```js
  // router.ts
  import { abcRouter } from "./abc/abc.router.js";
  export const rootRouter = mergeRouters({
    // Register your trpc router here to make it available
    abc: abcRouter,
  });
  ```
- Convention for creating a router:
  - `abc/abc.procedures.ts`: define procedures using `publicProcedure` method.
  - `abc/abc.router.ts`: define router by passing the procedures in `router` method.
  - > `@trpc/server` gives a `AnyProcedure` type for defining procedures.

## Attaching middlewares into a procedure

- Middlewares can be queued into procedures like this `publicProcedure.use(middleware1).use(middleware2).query(()=>{})`.

## Middleware creation

- `init.ts` exports `createMiddleware` method for creating middlewares.
- Reusable middlewares can be found in `middlewares` folder.
-
