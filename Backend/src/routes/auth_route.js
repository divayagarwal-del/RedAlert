// src/routes/complaint_routes.js
import express from "express";
import auth_route from "../controllers/admin_controller.js";
import authenticateToken from "../middlewares/authenticate_token.js";

const router = express.Router();

router.post("/complaints", authenticateToken, auth_route.);

export default router;
