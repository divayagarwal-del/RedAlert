// index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/index.js';
import loginRoute from './routes/login_route.js';
import complaintRoutes from './routes/complaint_routes.js';
import registerRoute from './routes/register_route.js';



// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware (for JSON parsing)
app.use(express.json());

// Connect to database
connectDb();

app.use("/api/login",loginRoute);
app.use('/api/complaints', complaintRoutes);
app.use("/api/register",registerRoute);
// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
