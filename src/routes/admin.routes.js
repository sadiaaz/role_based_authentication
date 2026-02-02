import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { blockMiddleware } from "../middlewares/block.middleware.js";
import {
  adminDashboard,
  getAllUsers,
  blockUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("admin"));
router.use(blockMiddleware);

router.get("/dashboard", adminDashboard);
router.get("/users", getAllUsers);
router.patch("/block/:userId", blockUser);

export default router;
