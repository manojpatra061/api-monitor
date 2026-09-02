import express from "express";
import type { Router, Request, Response } from "express";
import { okRouter } from "./ok.router.js";
import { trpcRouter } from "./trpc.router.js";
import { authRouter } from "./auth.router.js";

export const apiRouter: Router = express.Router();

apiRouter.use("/ok", okRouter);
apiRouter.use("/trpc", trpcRouter);
apiRouter.use("/auth/{*any}", authRouter);
