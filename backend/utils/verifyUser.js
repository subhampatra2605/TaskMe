import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

// 🔥 GET TOKEN FROM HEADER OR COOKIE
const getToken = (req) => {
  // 1. Check Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    return req.headers.authorization.split(" ")[1];
  }

  // 2. Fallback to cookie (for localhost)
  if (req.cookies && req.cookies.access_token) {
    return req.cookies.access_token;
  }

  return null;
};

// ✅ VERIFY TOKEN
export const verifyToken = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }

    req.user = user;
    next();
  });
};

// ✅ ADMIN ONLY
export const adminOnly = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }

    req.user = user;

    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return next(errorHandler(403, "Access Denied, admin only!"));
    }
  });
};
