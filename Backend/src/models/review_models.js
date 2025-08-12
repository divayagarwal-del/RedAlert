import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
    refId: { type: mongoose.Schema.Types.ObjectId, ref:'Complaint', required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
    description: { type: String }
})

export const Review = mongoose.model("Review", ReviewSchema)


  




