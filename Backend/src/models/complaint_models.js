// src/models/complaint_model.js
import mongoose, { Mongoose } from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: [String], // Array of tags
      enum: ["Maintenance", "Cleanliness", "Food", "Staff", "Other"], // example tags
      required: true
    },
    roomsIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
      }
    ],
    description: {
      type: String,
      required: true
    },
    images: [{
      type: String,
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ['New', 'Accepted', 'Waiting', 'Finished'],
      default: "New"
    }
  },
  { timestamps: true }
);

export const Complaint = mongoose.model("Complaint", ComplaintSchema);
