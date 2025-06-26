import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // ✅ This is required to populate req.body
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


// Import routes

// Post routes
import postRoutes from './routes/post.route.js';
app.use('/api', postRoutes);



// User routes
import userRoutes from './routes/user.route.js';
app.use('/api', userRoutes);
// Auth routes

// Database connection
import connectDB from './utils/db.js';
connectDB()


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});