import { Router } from "express";

import { login, refreshAccessToken } from "../controller/auth";

const router = Router();

router.route("/account/login").post(login);

router.route("/refresh-token").post(refreshAccessToken);

export default router;
