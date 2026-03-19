import prisma from "../models/prisma.js";

export const getTeams = async (req, res, next) => {
  try {
    const teams = await prisma.team.findMany({
      orderBy: { id: 'desc' },
      include: {
        admin: {
          select: { id: true, fullName: true }
        }
      }
    });
    res.json(teams);
  } catch (err) {
    next(err);
  }
};

export const createTeam = async (req, res, next) => {
  try {
    const team = await prisma.team.create({
      data: req.body
    });
    res.status(201).json(team);
  } catch (err) {
    next(err);
  }
};

export const getTeamById = async (req, res, next) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        admin: true,
        scorer: true
      }
    });
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (err) {
    next(err);
  }
};

export const updateTeam = async (req, res, next) => {
  try {
    const team = await prisma.team.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(team);
  } catch (err) {
    next(err);
  }
};

export const addPlayerToTeam = async (req, res, next) => {
  try {
    const teamId = parseInt(req.params.id);
    const { userId } = req.body;
    
    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team) return res.status(404).json({ message: "Team not found" });

    const playersArr = Array.isArray(team.players) ? team.players : [];
    const nid = parseInt(userId);
    if (!playersArr.includes(nid)) {
      playersArr.push(nid);
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: { players: playersArr }
    });

    res.json(updatedTeam);
  } catch (err) {
    next(err);
  }
};

export const updateScorer = async (req, res, next) => {
  try {
    const teamId = parseInt(req.params.id);
    const { scorerId } = req.body;
    
    const team = await prisma.team.update({
      where: { id: teamId },
      data: { scorerId: parseInt(scorerId) }
    });
    res.json(team);
  } catch (err) {
    next(err);
  }
};
