import express from "express";
import userController from "../controllers/user_controller.js";
import { authMiddleware} from "../middlewares/user_middleware.js";
import  authenticateToken  from "../middlewares/authenticate_token.js";

const router = express.Router();

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/registerComplaint",authenticateToken,userController.registerComplaint);
router.get("/getComplaints",authenticateToken,userController.getComplaints)
router.get("/getComplaint/:complaintId",authenticateToken,userController.getComplaint);
router.get("/getBookings",authenticateToken,userController.getBookings);
router.post("/closeComplaint/:complaintId",authenticateToken,userController.closeComplaint);

// Protected route example
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: `Hello ${req.user.username}`,
    user: req.user
  });
});

export default router;
