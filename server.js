import 'dotenv/config';
import app from './src/app.js';
import prisma from './src/models/prisma.js';
import bcrypt from 'bcrypt';

const PORT = process.env.PORT || 5000;

async function ensureSeeded() {
  try {
    // Seed Public Viewer
    const publicViewer = await prisma.user.findUnique({ where: { mobileNumber: "0000000000" } });
    if (!publicViewer) {
      const hashedPassword = await bcrypt.hash("public", 10);
      await prisma.user.create({
        data: {
          fullName: "Public Viewer",
          username: "public_viewer",
          mobileNumber: "0000000000",
          password: hashedPassword,
          role: "public",
          isApproved: true,
          isActive: true
        }
      });
      console.log("Seeded Public Viewer account");
    }

    // Seed Developer
    const developerAccount = await prisma.user.findUnique({ where: { mobileNumber: "DEVILUPPER" } });
    if (!developerAccount) {
      const hashedPassword = await bcrypt.hash("###DEVILUPPER###", 10);
      await prisma.user.create({
        data: {
          fullName: "Developer",
          username: "DEVILUPPER",
          mobileNumber: "DEVILUPPER",
          password: hashedPassword,
          role: "developer",
          isApproved: true,
          isActive: true
        }
      });
      console.log("Seeded Developer account");
    }
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  await ensureSeeded();
});
