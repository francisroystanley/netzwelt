import { Router } from "express";

import { getTerritories } from "../controller/territory";
import { authenticate } from "../middleware/jwt";

const router = Router();

router.route("/territories").get(authenticate, getTerritories);

export default router;
