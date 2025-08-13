import mongoose from "mongoose"

const ComplaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true,
    },
    description: {
        type: String,
    },
    tags: [{type: String}],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issueTime: { type: Date, required: true },
    solvedTime: { type: Date },
    status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
    orderOrComp: { type: Boolean, required: true }, // true = order, false = complaint
    image: { type: String }, // url
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }

})

export const Complaint = mongoose.model("Complaint", ComplaintSchema)