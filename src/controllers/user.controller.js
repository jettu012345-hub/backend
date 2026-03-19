import prisma from "../models/prisma.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: { not: "developer" } }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid user ID" });

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        players: true
      }
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Flatten playerProfile for frontend compatibility
    const responseData = {
      ...user,
      playerProfile: user.players && user.players.length > 0 ? user.players[0] : null
    };
    delete responseData.players;
    res.json(responseData);
  } catch (err) {
    next(err);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const { 
      fullName, 
      username, 
      profileImage, 
      email, 
      mobileNumber, 
      location, 
      playingRole, 
      battingStyle, 
      bowlingStyle, 
      dob, 
      gender 
    } = req.body;
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID" });

    const userUpdates = {};
    if (fullName !== undefined) userUpdates.fullName = fullName;
    if (username !== undefined) userUpdates.username = username;
    if (profileImage !== undefined) userUpdates.profileImage = profileImage;
    if (email !== undefined) userUpdates.email = email;
    if (mobileNumber !== undefined) userUpdates.mobileNumber = mobileNumber;

    const playerUpdates = {};
    if (location !== undefined) playerUpdates.location = location;
    if (playingRole !== undefined) playerUpdates.playingRole = playingRole;
    if (battingStyle !== undefined) playerUpdates.battingStyle = battingStyle;
    if (bowlingStyle !== undefined) playerUpdates.bowlingStyle = bowlingStyle;
    if (dob !== undefined) playerUpdates.dob = dob;
    if (gender !== undefined) playerUpdates.gender = gender;

    // Handle Player updates separately since it's a many relation in schema
    if (Object.keys(playerUpdates).length > 0) {
      const existingPlayer = await prisma.player.findFirst({
        where: { userId }
      });

      if (existingPlayer) {
        await prisma.player.update({
          where: { id: existingPlayer.id },
          data: playerUpdates
        });
      } else {
        await prisma.player.create({
          data: {
            ...playerUpdates,
            userId
          }
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userUpdates,
      include: {
        players: true
      }
    });

    // Flatten playerProfile for frontend compatibility
    const responseData = {
      ...updatedUser,
      playerProfile: updatedUser.players && updatedUser.players.length > 0 ? updatedUser.players[0] : null
    };
    delete responseData.players;
    res.json(responseData);
  } catch (err) {
    next(err);
  }
};

export const followUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const targetUserId = parseInt(req.params.id);
    
    // In a real app with many-to-many, we'd use a separate table
    // But here we'll follow the JSON array pattern if that's what's expected
    // OR we can use Prisma's nested connect if the schema supports it.
    // Let's check the schema first.
    res.status(501).json({ message: "Follow logic depends on schema implementation" });
  } catch (err) {
    next(err);
  }
};
