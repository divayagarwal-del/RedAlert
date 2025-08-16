// src/routes/complaint_routes.js
import express from "express";
import auth_route from "../controllers/admin_controller.js";
import review_route from "../controllers/review_controller.js"
const router = express.Router();



router.post("/acceptComplaint/:complaintId", auth_route.acceptComplaint); // done 
router.post("/updateComplaintStatus/:complaintId", auth_route.updateComplaintStatus); // new endpoint for status progression
router.get("/getComplaints", auth_route.getComplaints); // done 
router.get("/getComplaint/:complaintId", auth_route.getComplaint); // done
router.post("/waitingComplaint/:complaintId", auth_route.waitingComplaint); // done
router.get("/listOfUsers", auth_route.listOfUsers)// done 
router.get("/listBookings", auth_route.listOfBookings); // done
router.get("/getComplaintTagsStats", auth_route.getComplaintTagsStats); // new endpoint for tags statistics
router.get("/getMonthlyComplaintStats", auth_route.getMonthlyComplaintStats); // new endpoint for monthly complaint statistics
router.get("/getReview/:complaintId", review_route.getReview);
router.get("/getReveiws", review_route.getReviews);

export default router;
