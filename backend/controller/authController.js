const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');

const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({ success: false, message });
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

const cookieMaxAge = Number(process.env.COOKIE_MAX_AGE) || 24 * 60 * 60 * 1000; // 1 day

const setAuthCookie = (res, token) => {
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: cookieMaxAge,
  });
};


// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return sendError(res, 400, 'All fields are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 400, 'Email already registered');
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

   const token = generateToken(user._id);
setAuthCookie(res, token);

return res.status(201).json({
  success: true,
  message: 'User registered successfully',
  data: {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role:user.role
    },
  },
});
  } catch (err) {
    console.error('Signup error:', err);
    return sendError(res, 500, 'Internal server error');
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, 400, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, 400, 'Invalid credentials');
    }

    const token = generateToken(user._id);
setAuthCookie(res, token);

return res.json({
  success: true,
  message: 'Logged in successfully',
  data: {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role:user.role
    },
  },
});

  } catch (err) {
    console.error('Login error:', err);
    return sendError(res, 500, 'Internal server error');
  }
};

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return sendError(res, 400, 'Email is required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      // To avoid leaking emails, you can still send success.
      return sendError(res, 400, 'User not found with this email');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // In a real app, send resetToken via email (here just return it).
    return res.json({
      success: true,
      message: 'Password reset token generated',
      data: {
        resetToken, // for dev/testing only
      },
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    return sendError(res, 500, 'Internal server error');
  }
};

// POST /api/auth/reset-password
// body: { token, password }
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return sendError(res, 400, 'Token and new password are required');
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return sendError(res, 400, 'Token is invalid or has expired');
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    user.password = await bcrypt.hash(password, saltRounds);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (err) {
    console.error('Reset password error:', err);
    return sendError(res, 500, 'Internal server error');
  }
};

// POST /api/auth/change-password
// body: { email, oldPassword, newPassword }
exports.changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return sendError(res, 400, 'Email, old password and new password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, 400, 'User not found');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return sendError(res, 400, 'Old password is incorrect');
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    await user.save();

    return res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (err) {
    console.error('Change password error:', err);
    return sendError(res, 500, 'Internal server error');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return res.json({
    success: true,
    message: 'Logged out successfully',
  });
};

// ✅ NEW: Get current user profile (protected)
exports.getProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone,
          role: req.user.role,
        },
      },
    });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
