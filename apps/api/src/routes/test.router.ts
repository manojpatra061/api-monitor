import express from "express";
import type { Router, Request, Response } from "express";

export const testRouter: Router = express.Router();

testRouter.route("/").all((req: Request, res: Response) => {
  res.json({
    message: "This is a test route!",
    method: req.method,
  });
});
