import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDb.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Hello world' });
});

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
