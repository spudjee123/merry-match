import jwt from "jsonwebtoken";
import 'dotenv/config';

export const validatedLogin = (req, res, next) => {
  const token = req.body.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json("Token is required");
  }
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifyToken;
  } catch (error) {
    return res.status(401).json("Invalid token");
  }
  return next();
}