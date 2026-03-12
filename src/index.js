require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Import models (required for Sequelize sync)
require('./models/user.model');
require('./models/court.model');
require('./models/reservation.model');

const authRoutes = require('./routes/auth.routes');
const courtsRoutes = require('./routes/courts.routes');
const reservationsRoutes = require('./routes/reservations.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courts', courtsRoutes);
app.use('/api/reservations', reservationsRoutes);

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Error handler
app.use(errorHandler);

// Start
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('DB connection failed', err);
  process.exit(1);
});
