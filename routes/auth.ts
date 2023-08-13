import { Router } from "express";

import { login, logout, refreshAccessToken } from "../controller/auth";
import { authenticate } from "../middleware/jwt";

const router = Router();

router.route("/account/authenticate").post(authenticate);

router.route("/account/login").post(login);

router.route("/account/logout").post(logout);

router.route("/refresh-token").post(refreshAccessToken);

export default router;
