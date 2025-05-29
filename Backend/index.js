import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


// Import routes


app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
}
);
// Database connection
import connectDB from './utils/db.js';
connectDB()


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});