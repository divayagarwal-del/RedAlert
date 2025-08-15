import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
    stars: {
        type: Number, min: 1, max: 5,
        required: true,
        default: -1
    },
    description: { type: String }
})

export const Review = mongoose.model("Review", ReviewSchema)







