import { Request, Response, Router } from "express";

import authRouter from "./auth";
import territoryRouter from "./territory";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

router.use("/", [authRouter, territoryRouter]);

export default router;
