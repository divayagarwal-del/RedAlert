// src/routes/complaint_routes.js
import express from "express";
import auth_route from "../controllers/admin_controller.js";
import reviewRoute from "../controllers/review_controller.js"
import room_route from "../controllers/addRoom_controller.js"
const router = express.Router();



router.post("/acceptComplaint/:complaintId", auth_route.acceptComplaint); // done 
router.get("/getComplaints", auth_route.getComplaints); // done 
router.get("/getComplaint/:complaintId", auth_route.getComplaint); // done
router.post("/waitingComplaint/:complaintId", auth_route.waitingComplaint); // done
router.get("/listOfUsers", auth_route.listOfUsers)// done 
router.get("/listBookings", auth_route.listOfBookings); // done
router.get("/getReview/:reviewId", reviewRoute.getReview);
router.get("/getReviews", reviewRoute.getReviews);
router.post("/addRoom", room_route.addRoom);

export default router;
