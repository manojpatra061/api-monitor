# Middlewares

- It only contains **reusable middlewares** that can be used in multiple procedures.
- `init.ts` exports `createMiddleware` method for creating middlewares.

  ```ts
  export const newMiddleware = createMiddleware(async (opts) => {
    // middleware implementations...

    return opts.next({
      ctx: {
        // extending context
        somethingNew: "something new",
      },
    });
  });
  ```

## Guidelines

1. They should be queued in procedures only.
2. Conventions:
   - suffix `Middleware`. ex: `authMiddleware`

## FAQs

1. Can I use these middlewares as express middlewares?
   - No. They are only meant for tRPC procedures.

## Resources

- [Extending context](https://trpc.io/docs/server/middlewares#context-extension)
