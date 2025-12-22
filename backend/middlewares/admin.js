const admin = (req, res, next) => {
  // Check if user exists and has admin role
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  res.status(403).json({
    success: false,
    message: 'Admin access required'
  });
};

module.exports = { admin };
