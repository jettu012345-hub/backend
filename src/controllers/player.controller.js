import prisma from "../models/prisma.js";

export const getPlayer = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid player ID" });

    const player = await prisma.player.findFirst({
      where: { userId },
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

export const incrementPlayerViews = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid player ID" });

    const player = await prisma.player.findFirst({
      where: { userId }
    });

    if (!player) return res.status(404).json({ message: "Player not found" });

    const updatedPlayer = await prisma.player.update({
      where: { id: player.id },
      data: { views: { increment: 1 } }
    });

    res.json(updatedPlayer);
  } catch (err) {
    next(err);
  }
};
