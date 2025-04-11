const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "asdfghjkl.10"; // Change this in production

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
