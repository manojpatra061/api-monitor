import express from "express";
import type { Router } from "express";
import { homeRouter } from "./home.router.js";
import { apiRouter } from "./api.router.js";

export const router: Router = express.Router();

router.use("/", homeRouter);
router.use("/api", apiRouter);
router.use("*notFound", (req, res) => {
  const path = req.params.notFound.join("/");
  res.status(404).json({
    status: 404,
    message: `Route not found: '${path}' doesn't exist`,
  });
});
