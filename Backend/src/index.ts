import express, { type Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { logger, errorHandler, notFound } from './middleware/index.js';
import authRoutes from './routes/auth.js';
import clientTracksRoutes from './routes/client/tracks.js';
import adminTracksRoutes from './routes/admin/tracks.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use('/api/auth', authRoutes);
// shared 'both' routes were not created; client route exposes read endpoints
app.use('/api/client/tracks', clientTracksRoutes);
app.use('/api/admin/tracks', adminTracksRoutes);

// Connect to MongoDB
connectDB();


// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
