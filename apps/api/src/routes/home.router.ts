import express from "express";
import type { Request, Response, Router } from "express";
import { okRouter } from "./ok.router.js";

export const homeRouter: Router = express.Router();

homeRouter.route("/").all((req: Request, res: Response) => {
  res.json({ message: "Welcome to the API Monitor!", method: req.method });
});

homeRouter.use("/ok", okRouter);
