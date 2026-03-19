import prisma from "../models/prisma.js";

export const getNotifications = async (req, res, next) => {
  try {
    const userId = parseInt(req.headers["x-user-id"]);
    if (isNaN(userId)) return res.status(401).json({ message: "Unauthorized" });

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

export const markRead = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const notification = await prisma.notification.update({
      where: { id },
      data: { read: true }
    });
    res.json(notification);
  } catch (err) {
    next(err);
  }
};
