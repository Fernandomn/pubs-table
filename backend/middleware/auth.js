// backend/middleware/auth.js

module.exports = function (sessions) {
  return function (req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const userId = sessions[token];

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.userId = userId;
    next();
  };
};
