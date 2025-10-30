// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import eventRoutes from './routes/eventRoutes.js';
// import bookingRoutes from './routes/bookingRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/bookings', bookingRoutes);

// app.get('/', (req, res) => res.send('EventEase Pro API'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();

// ✅ Connect to MongoDB Atlas using environment variable
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('EventEase Pro API is running...');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
