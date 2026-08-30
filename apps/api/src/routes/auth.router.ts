import express from "express";
import type { Router } from "express";
import { auth } from "../lib/auth.js";
import { toNodeHandler } from "better-auth/node";

export const authRouter: Router = express.Router();

authRouter.all("/", toNodeHandler(auth));
