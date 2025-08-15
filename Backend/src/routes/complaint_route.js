// src/routes/complaint_routes.js
import express from "express";
import { registerComplaint } from "../controllers/admin_controller.js";
import  authenticateToken  from "../middlewares/authenticate_token.js";

const router = express.Router();

router.post("/complaints", authenticateToken, registerComplaint);

export default router;
