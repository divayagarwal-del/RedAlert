import mongoose from "mongoose";
import { Review } from "../models/review_models.js";
import { Complaint } from "../models/complaint_models.js";

async function getReview(req, res) {
    try {
        const { complaintId } = req.params


        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        const reviewID = complaint.review;
        if (!reviewID) {
            return res.status(404).json({ message: "No review found for this complaint" });
        }

        const review = await Review.findById(reviewID);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({
            message: "Review fetched successfully",
            review: review
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
async function getReviews(req, res) {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ message: "Reviews Feteched Succefully", reviews: reviews })
    } catch (err) {
        console.err(err);
        res.status(500).json({
            msessage: "server error"
        })
    }
}

export default {
    getReview,
    getReviews
}