// index.js
import express from 'express';
import dotenv from 'dotenv';
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import connectDb from './db/index.js';
import userRoutes from "./routes/user_route.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin_route.js";
import cors from 'cors';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_API_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRAT
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// User routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
// Connect to database

connectDb();
// Test route
app.get("/", (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
