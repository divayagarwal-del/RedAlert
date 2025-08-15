// index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/index.js';
import userRoutes from "./routes/user_route.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

app.use(express.json());
app.use(cookieParser());

// User routes
app.use("/api/users", userRoutes);

// Connect to database

connectDb();
// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
