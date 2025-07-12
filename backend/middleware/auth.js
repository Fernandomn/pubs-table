// backend/middleware/auth.js
const sessions = require("../sessions");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const userId = sessions[token];

  if (!userId) return res.status(401).json({ error: "Não autorizado" });

  req.userId = userId;
  next();
}

module.exports = authMiddleware;    
