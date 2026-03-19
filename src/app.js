import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/index.js";

const app = express();

// Trust proxy for Render
app.set("trust proxy", 1);

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
  origin: "*", // Restrict this in production
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// API Routes
app.use("/api/v1", router);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

export default app;
