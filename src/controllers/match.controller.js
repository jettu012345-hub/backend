import prisma from "../models/prisma.js";

export const getMatches = async (req, res, next) => {
  try {
    const matches = await prisma.match.findMany({
      orderBy: { id: 'desc' },
      include: {
        teamA: true,
        teamB: true,
      }
    });
    res.json(matches);
  } catch (err) {
    next(err);
  }
};

export const createMatch = async (req, res, next) => {
  try {
    const matchData = { ...req.body, createdById: req.user.id };
    const match = await prisma.match.create({ data: matchData });
    res.status(201).json(match);
  } catch (err) {
    next(err);
  }
};

export const getMatchById = async (req, res, next) => {
  try {
    const match = await prisma.match.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        teamA: true,
        teamB: true,
      }
    });
    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json(match);
  } catch (err) {
    next(err);
  }
};

export const updateMatch = async (req, res, next) => {
  try {
    const match = await prisma.match.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(match);
  } catch (err) {
    next(err);
  }
};

export const recordBall = async (req, res, next) => {
  try {
    const { ball } = req.body;
    const matchId = parseInt(req.params.id);
    const match = await prisma.match.findUnique({ where: { id: matchId } });
    if (!match) return res.status(404).json({ message: "Match not found" });

    const ballsArr = Array.isArray(match.balls) ? match.balls : [];
    ballsArr.push(ball);

    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: { balls: ballsArr }
    });

    // TODO: Update player/team stats here like in storage.ts

    res.json(updatedMatch);
  } catch (err) {
    next(err);
  }
};
