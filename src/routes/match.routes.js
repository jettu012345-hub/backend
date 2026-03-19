import { Router } from "express";
import { getMatches, createMatch, getMatchById, updateMatch, recordBall, updateMatchStatus, updateMatchToss, updatePlayingXI, declareWalkover } from "../controllers/match.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getMatches);
router.post("/", authenticate, createMatch);
router.get("/:id", getMatchById);
router.patch("/:id", authenticate, updateMatch);
router.post("/:id/ball", authenticate, recordBall);
router.patch("/:id/status", authenticate, updateMatchStatus);
router.patch("/:id/toss", authenticate, updateMatchToss);
router.patch("/:id/playing-xi", authenticate, updatePlayingXI);
router.post("/:id/walkover", authenticate, declareWalkover);

export default router;
