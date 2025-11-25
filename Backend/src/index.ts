import dotenv from 'dotenv'
import express, { type Express } from 'express'
import cors from 'cors'
import path from 'path'
import connectDB from './config/database.js'
import { logger, errorHandler, notFound } from './middleware/index.js'
import authRoutes from './routes/auth.js'
import adminSongsRoutes from './routes/admin/songs.js'
import spotifyRoutes from './routes/spotify.js'

// Import models to register them with mongoose
import './models/User'
import './models/Song'
import './models/Artist'
import './models/Album'



dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/songs', spotifyRoutes)
app.use('/api/spotify', spotifyRoutes)
// Backwards-compatible mounts for older clients
app.use('/api/client/songs', spotifyRoutes)
app.use('/api/admin/songs', adminSongsRoutes)



// Health
app.get('/', (req, res) => res.json({ ok: true }))

// Connect to MongoDB and start server
async function start() {
  await connectDB()
  // 404 handler
  app.use(notFound)
  // Error handler
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}

start().catch((e) => {
  console.error('Failed to start server', e)
  process.exit(1)
})
