require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middlewares (exact same as your old project)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://yourdomain.com'
    : 'http://localhost:5173',
  credentials: true,
}));

// DB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error', err);
    process.exit(1);
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API is running', 
    environment: process.env.NODE_ENV 
  });
});

// ✅ PRODUCTION: Serve React build (EXACT same as your old project)
// if (process.env.NODE_ENV === 'production') {
//   console.log('🚀 Serving React production build...');
  
//   // Construct the path to the frontend build directory (SAME as old project)
//   const frontendDistPath = path.resolve(__dirname, '..', 'frontend', 'dist');
//   app.use(express.static(frontendDistPath));

//   // SPA catch-all (SAME as old project)
//   app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(frontendDistPath, 'index.html'));
//   });
// }
if (process.env.NODE_ENV === 'production') {
  console.log('🚀 Serving React production build...');

  const frontendDistPath = path.resolve(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendDistPath));

  // ✅ SPA fallback (Express 5 safe)
  app.use((req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Dev root route
if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => {
    res.json({ message: 'API is running (Development)' });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(path.join(path.resolve(), 'frontend')); // ✅ Same as your old project
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV}`);
});
