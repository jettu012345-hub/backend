import prisma from "../models/prisma.js";

export const getStats = async (req, res, next) => {
  try {
    const totalPlayers = await prisma.user.count({ where: { role: 'player' } });
    const totalTeams = await prisma.team.count();
    const totalMatches = await prisma.match.count();
    
    // Recent matches
    const recentMatches = await prisma.match.findMany({
      take: 5,
      orderBy: { date: 'desc' },
      include: {
        teamA: { select: { name: true } },
        teamB: { select: { name: true } }
      }
    });

    res.json({
      totalPlayers,
      totalTeams,
      totalMatches,
      recentMatches,
      totalCollected: 0, // Placeholder
      pendingPayments: [] // Placeholder
    });
  } catch (err) {
    next(err);
  }
};

export const getPlayerStats = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const player = await prisma.player.findFirst({
      where: { userId: userId },
      include: {
        user: true
      }
    });
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    next(err);
  }
};

export const getLeaderboard = async (req, res, next) => {
  try {
    const players = await prisma.player.findMany({
      include: {
        user: { select: { fullName: true, profileImage: true } }
      }
    });
    // Simplified sorting logic
    res.json(players);
  } catch (err) {
    next(err);
  }
};
