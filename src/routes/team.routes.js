import { Router } from "express";
import { getTeams, createTeam, getTeamById, updateTeam, addPlayerToTeam, updateScorer } from "../controllers/team.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getTeams);
router.post("/", authenticate, createTeam);
router.get("/:id", getTeamById);
router.patch("/:id", authenticate, updateTeam);
router.post("/:id/players", authenticate, addPlayerToTeam);
router.patch("/:id/scorer", authenticate, updateScorer);

export default router;
