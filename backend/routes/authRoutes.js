const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  logout,
  getProfile
} = require('../controller/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// POST /api/auth/reset-password
router.post('/reset-password', resetPassword);

// POST /api/auth/change-password
router.post('/change-password', changePassword);

router.post('/logout', logout);

router.get('/profile', protect, getProfile);

module.exports = router;
