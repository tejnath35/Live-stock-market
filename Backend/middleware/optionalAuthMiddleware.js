const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    // If token is invalid, we can either reject or ignore and let them act as unauthenticated.
    // Given the previous fallback behavior, treating an invalid token as unauthenticated might be fine,
    // but typically we should reject an invalid token to prevent confusion.
    return res.status(401).json({ message: "Invalid token" });
  }
};
