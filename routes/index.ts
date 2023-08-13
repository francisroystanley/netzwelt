import { Request, Response, Router } from "express";

import authRouter from "./auth";
import territoryRouter from "./territory";

const router = Router();

router.get("/api/health-check", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

router.use("/api", [authRouter, territoryRouter]);

export default router;
