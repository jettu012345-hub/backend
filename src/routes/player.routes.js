import { Router } from "express";
import { getPlayer, incrementPlayerViews } from "../controllers/player.controller.js";
import { updateUserProfile } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:id", getPlayer);
router.post("/:id/views", incrementPlayerViews);
router.patch("/:id/profile", authenticate, updateUserProfile);

export default router;
