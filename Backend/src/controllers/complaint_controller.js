import { Complaint } from '../models/complaint_models.js';

export const issueComplaint = async (req, res) => {
  try {
    const {
      title,
      description,
      tags,
      userId,
      issueTime,
      orderOrComp,
      image,
      reviewId
    } = req.body;

    // Validate required fields
    if (!title || !userId || !issueTime || orderOrComp === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const complaint = new Complaint({
      title,
      description,
      tags,
      userId,
      issueTime,
      orderOrComp,
      image,
      reviewId
    });

    await complaint.save();

    res.status(201).json({ message: "Complaint issued successfully", complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};