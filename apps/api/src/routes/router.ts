import express from "express";
import type { Router } from "express";
import { homeRouter } from "./home.router.js";
import { testRouter } from "./test.router.js";
import { trpc as trpcRouter } from "../trpc/index.js";
import { authRouter } from "./auth.router.js";

export const router: Router = express.Router();

router.use("/", homeRouter);
router.use("/trpc", trpcRouter);
router.use("/test", testRouter);
router.use("/api/auth/{*any}", authRouter);
router.use("*notFound", (req, res) => {
  const path = req.params.notFound.join("/");
  res.status(404).json({
    status: 404,
    message: `Route not found: '${path}' doesn't exist`,
  });
});
