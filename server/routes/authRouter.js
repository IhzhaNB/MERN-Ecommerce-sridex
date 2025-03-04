import express from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { protectedMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// post /api/v1/auth/register
router.post("/register", registerUser);

// post /api/v1/auth/login
router.post("/login", loginUser);

// post /api/v1/auth/logout
router.get("/logout", protectedMiddleware, logoutUser);

// post /api/v1/auth/getuser
router.get("/getuser", protectedMiddleware, getCurrentUser);

export default router;
