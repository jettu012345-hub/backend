import prisma from "../models/prisma.js";

export const getCollections = async (req, res, next) => {
  try {
    const { teamId } = req.query;
    const collections = await prisma.collection.findMany({
      where: teamId ? { teamId: parseInt(teamId) } : {},
      include: {
        team: true,
        payments: true
      }
    });
    res.json(collections);
  } catch (err) {
    next(err);
  }
};

export const createCollection = async (req, res, next) => {
  try {
    const collection = await prisma.collection.create({
      data: req.body
    });
    res.status(201).json(collection);
  } catch (err) {
    next(err);
  }
};

export const getMemberPayments = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { memberId: parseInt(req.params.memberId) },
      include: {
        collection: true
      }
    });
    res.json(payments);
  } catch (err) {
    next(err);
  }
};

export const submitPayment = async (req, res, next) => {
  try {
    const payment = await prisma.payment.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...req.body,
        status: "verification_pending",
        submittedAt: new Date()
      }
    });
    res.json(payment);
  } catch (err) {
    next(err);
  }
};
