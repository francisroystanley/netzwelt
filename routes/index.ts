import { Request, Response, Router } from "express";

import authRouter from "./auth";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

router.use("/", authRouter);

export default router;
