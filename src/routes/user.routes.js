import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import {
  userDashboard,
  userProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("user"));

router.get("/dashboard", userDashboard);
router.get("/profile", userProfile);

export default router;
