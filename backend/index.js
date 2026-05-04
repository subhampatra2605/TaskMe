import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";
import reportRoutes from "./routes/report.route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.log(err));

// ✅ CORS (FIXED)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// ✅ Static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ✅ PORT FIX
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
