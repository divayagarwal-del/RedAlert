import express from "express";
import { register, login } from "../controllers/user_controller.js";
import { authMiddleware } from "../middlewares/user_middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route example
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: `Hello ${req.user.username}`,
    user: req.user
  });
});

export default router;
