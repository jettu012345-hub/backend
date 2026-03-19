import { Router } from "express";
import { getStats, getPlayerStats, getLeaderboard } from "../controllers/stats.controller.js";

const router = Router();

router.get("/", getStats);
router.get("/player/:id", getPlayerStats);
router.get("/:id", getPlayerStats); // Added for /api/v1/player-stats/:id
router.get("/leaderboard", getLeaderboard);

export default router;
