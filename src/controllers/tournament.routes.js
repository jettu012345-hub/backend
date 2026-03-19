import { Router } from "express";
import { getTournaments, createTournament, getTournamentById, updateTournamentStandings, generatePlayoffs } from "../controllers/tournament.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getTournaments);
router.post("/", authenticate, createTournament);
router.get("/:id", getTournamentById);
router.post("/:id/standings", authenticate, updateTournamentStandings);
router.post("/:id/generate-playoffs", authenticate, generatePlayoffs);

export default router;
