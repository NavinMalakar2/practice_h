import express from 'express'
import bodyParser from 'body-parser';
import { connectDB } from './src/config/db.js';
import cors from 'cors'
import dotenv from 'dotenv' 
import authRoutes from './src/routes/user_auth.route.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is undefined

app.use(express.json());
app.use(cors()); 
app.use(bodyParser.json());

// Sample GET endpoint
app.get('/', (req, res) => {
  res.send('Hello, Backend!');
});
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
