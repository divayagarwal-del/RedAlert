// app.js
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/index.js';
import userRoutes from './routes/user.routes.js'
// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware (for JSON parsing)
app.use(express.json());

// Connect to database
connectDb();

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use("/api/v1/user",userRoutes )

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
