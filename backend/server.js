import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
connectDB();

const app = express();

// ✅ Allow frontend domain
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://event-ease-pro.vercel.app'],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Prefix all routes with /api
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// ✅ Base route
app.get('/', (req, res) => {
  res.send('✅ EventEase Pro API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
