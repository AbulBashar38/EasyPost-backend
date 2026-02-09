import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import router from "./router/router";
// load .env early so other modules can read process.env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// API Info endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Easy Post Backend API",
    version: "1.0.0",
  });
});

// Routes
app.use(router);

// Error handling middleware - must be after routes
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
