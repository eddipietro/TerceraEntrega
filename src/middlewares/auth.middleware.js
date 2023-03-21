const authMiddleware = (req, res, next) => {
    if (!req.session.username || !req.session.password) {
      return res.status(403).json({
        success: false,
        message: "User not logged in",
      });
    }
    next();
  };
  
  module.exports = authMiddleware;