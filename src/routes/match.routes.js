import { Router } from "express";
import { getMatches, createMatch, getMatchById, updateMatch, recordBall } from "../controllers/match.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getMatches);
router.post("/", authenticate, createMatch);
router.get("/:id", getMatchById);
router.patch("/:id", authenticate, updateMatch);
router.post("/:id/ball", authenticate, recordBall);

export default router;
