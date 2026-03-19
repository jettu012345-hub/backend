import prisma from "../models/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = async (req, res, next) => {
  try {
    const { fullName, mobileNumber, password, email, role, isApproved, playingRole, battingStyle, bowlingStyle } = req.body;
    
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({ message: "Mobile number must be exactly 10 digits." });
    }

    const existing = await prisma.user.findUnique({ where: { mobileNumber } });
    if (existing) {
      return res.status(400).json({ message: "Sorry, you have already registered with this mobile number." });
    }

    const hashedPassword = await bcrypt.hash(password || "password", 10);
    const username = "user_" + mobileNumber;

    const user = await prisma.user.create({
      data: {
        fullName,
        mobileNumber,
        password: hashedPassword,
        email,
        username,
        role: role || 'player',
        isApproved: isApproved ?? false,
      }
    });

    if (user.role === 'player') {
      await prisma.player.create({
        data: {
          userId: user.id,
          playingRole: playingRole || 'Batsman',
          battingStyle: battingStyle || 'Right_hand_bat',
          bowlingStyle: bowlingStyle || 'Right-arm medium',
        }
      });
    }

    res.status(201).json({ 
      id: user.id, 
      fullName: user.fullName, 
      mobileNumber: user.mobileNumber, 
      role: user.role,
      message: "Registration successful. Please wait for admin approval."
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { mobileNumber, password } = req.body;
    const user = await prisma.user.findUnique({ where: { mobileNumber } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.role !== 'public' && user.role !== 'developer') {
      if (!user.isApproved || !user.isActive) {
        return res.status(403).json({ message: "Sorry, your account is pending approval or has been deactivated." });
      }
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({
      token,
      user: {
        id: user.id,
        _id: user.id.toString(), // compatibility layer
        fullName: user.fullName,
        role: user.role,
        mobileNumber: user.mobileNumber
      }
    });
  } catch (err) {
    next(err);
  }
};
