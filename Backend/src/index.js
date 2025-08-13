// app.js
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/index.js';
import complaintRoutes from './routes/complaint_routes.js';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware (for JSON parsing)
app.use(express.json());

// Add complaint routes
app.use('/api/complaints', complaintRoutes);

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