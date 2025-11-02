import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './conn/db.js';
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js';

dotenv.config();
const app = express();

connectDB();

app.use(
  cors({
    origin: 'https://mern-todo-org.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());

// api
app.use('/api/user', userRoutes);
app.use('/api/list', listRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
