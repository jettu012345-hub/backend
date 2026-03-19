import { Router } from "express";
import { getUsers, getUserById, updateUserStatus, updateUserProfile, followUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id/status", authenticate, updateUserStatus);
router.patch("/:id/profile", authenticate, updateUserProfile);
router.post("/:id/follow", authenticate, followUser);

export default router;
