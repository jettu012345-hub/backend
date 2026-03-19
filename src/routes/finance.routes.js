import { Router } from "express";
import { getCollections, createCollection, getMemberPayments, submitPayment } from "../controllers/finance.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/collections", getCollections);
router.post("/collections", authenticate, createCollection);
router.get("/payments/member/:memberId", authenticate, getMemberPayments);
router.patch("/payments/:id/submit", authenticate, submitPayment);

export default router;
