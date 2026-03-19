import { Router } from "express";
import authRoutes from "./auth.routes.js";
import matchRoutes from "./match.routes.js";
import teamRoutes from "./team.routes.js";
import tournamentRoutes from "./tournament.routes.js";
import statsRoutes from "./stats.routes.js";
import userRoutes from "./user.routes.js";
import financeRoutes from "./finance.routes.js";
import playerRoutes from "./player.routes.js";
import notificationRoutes from "./notification.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/matches", matchRoutes);
router.use("/teams", teamRoutes);
router.use("/tournaments", tournamentRoutes);
router.use("/stats", statsRoutes);
router.use("/player-stats", statsRoutes);
router.use("/users", userRoutes);
router.use("/players", playerRoutes);
router.use("/notifications", notificationRoutes);
router.use("/", financeRoutes);

export default router;
