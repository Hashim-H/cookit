const jwt = require("jsonwebtoken");
const User = require("./../models/users");
const SECRET_KEY = process.env.SECRET_KEY || "not secure";

const authMiddleware = async (req, res, next) => {
  const token = req.headers["jwt"];
  if (!token) return res.sendStatus(403);
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.getById(id);
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
