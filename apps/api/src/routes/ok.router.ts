import express from "express";
import type { Router, Request, Response } from "express";

export const okRouter: Router = express.Router();

okRouter.route("/").all((req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "Route is working!",
    method: req.method,
    url: req.originalUrl,
  });
});
