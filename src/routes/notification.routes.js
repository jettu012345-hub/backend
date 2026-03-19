import { Router } from "express";
import { getNotifications, markRead } from "../controllers/notification.controller.js";

const router = Router();

router.get("/", getNotifications);
router.patch("/:id/read", markRead);

export default router;
