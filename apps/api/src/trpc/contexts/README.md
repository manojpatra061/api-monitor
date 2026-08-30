# Context

Context holds data that all of your tRPC procedures will have access to.

## Inner vs Outer context

- https://trpc.io/docs/v11/context#inner-and-outer-context
- **Inner**
  - Context that doesn't depend on request.
- **Outer**
  - Context that depends on request.
  - Brings `req` & `res` to the context as _"not `undefined`"_.
