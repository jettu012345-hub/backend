import { Router } from "express";
import authRoutes from "./auth.routes.js";
import matchRoutes from "./match.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/matches", matchRoutes);

export default router;
