import prisma from "../models/prisma.js";

export const getTournaments = async (req, res, next) => {
  try {
    const tournaments = await prisma.tournament.findMany({
      orderBy: { id: 'desc' },
      include: {
        admin: {
          select: { id: true, fullName: true }
        }
      }
    });
    res.json(tournaments);
  } catch (err) {
    next(err);
  }
};

export const createTournament = async (req, res, next) => {
  try {
    const tournament = await prisma.tournament.create({
      data: req.body
    });
    res.status(201).json(tournament);
  } catch (err) {
    next(err);
  }
};

export const getTournamentById = async (req, res, next) => {
  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        admin: true,
        winner: true,
        allMatches: {
          include: {
            teamA: true,
            teamB: true
          }
        }
      }
    });
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    res.json(tournament);
  } catch (err) {
    next(err);
  }
};

export const updateTournamentStandings = async (req, res, next) => {
  try {
    const tournamentId = parseInt(req.params.id);
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId }
    });
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });

    const allMatches = await prisma.match.findMany({
      where: { tournamentId: tournamentId }
    });
    
    const completedMatches = allMatches.filter(m => m.status === 'completed' || m.status === 'walkover');

    const teamStatsMap = new Map();
    const teamsArr = Array.isArray(tournament.teams) ? tournament.teams : [];
    
    for (const tid of teamsArr) {
      teamStatsMap.set(tid, { teamId: tid, played: 0, won: 0, lost: 0, pts: 0, nrr: 0 });
    }

    for (const match of completedMatches) {
      const statsA = teamStatsMap.get(match.teamAId);
      const statsB = teamStatsMap.get(match.teamBId);
      if (!statsA || !statsB) continue;

      statsA.played++;
      statsB.played++;
      
      if (match.winnerId) {
        if (match.winnerId === match.teamAId) {
          statsA.won++;
          statsA.pts += 2;
          statsB.lost++;
        } else {
          statsB.won++;
          statsB.pts += 2;
          statsA.lost++;
        }
      }
    }
    
    const standings = Array.from(teamStatsMap.values());
    const updatedTournament = await prisma.tournament.update({
      where: { id: tournamentId },
      data: { standings: standings }
    });

    res.json(updatedTournament);
  } catch (err) {
    next(err);
  }
};

export const generatePlayoffs = async (req, res, next) => {
  try {
    // Basic implementation for now
    res.json({ message: "Playoffs generation logic would go here" });
  } catch (err) {
    next(err);
  }
};
