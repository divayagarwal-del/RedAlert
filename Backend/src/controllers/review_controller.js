
import { Review } from "../models/review_models";

async function getReview(req, res) {
    const reviewId = req.params;

    const review = await Review.findById(reviewId);

    res.status(200).json({
        message: "Review Fetched Succesfully",
        review: review,
    })

};

async function getReviews(req, res) {
    const reviews = await Review.find({});
    res.status(200).json({
        message: "Reveiws Fetched Sucessfully.",
        review: reviews
    })
}

export default {
    getReview,
    getReviews
}