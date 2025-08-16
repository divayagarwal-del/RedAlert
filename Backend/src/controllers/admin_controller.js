// src/controllers/complaint_controller.js
import bookings from "../models/bookings.js";
import { Complaint } from "../models/complaint_models.js";
import { User } from "../models/user_models.js";

async function acceptComplaint(req, res) {
    const { complaintId } = req.params;
    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(complaintId, {
            status: "Accepted"
        })

        res.status(200).json({ message: 'Complaint Accepted successfully', complaint: updatedComplaint })
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
async function getComplaints(req, res) {
    try {
        const complaints = await Complaint.find({});
        res.status(200).json({
            message: "User Complaints fetched successfully on admin",
            complaints
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function getComplaint(req, res) {
    const { complaintId } = req.params;
    try {
        const complaint = await Complaint.findById(complaintId)

        res.status(200).json({
            message: "User Complaint fetched successfully",
            complaint
        });
    }
    catch (error) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
async function waitingComplaint(req, res) {
    const { complaintId } = req.params;
    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(complaintId, {
            status: 'Waiting'
        })

        res.status(200).json({ message: 'Complaint Accepted successfully', complaint: updatedComplaint })
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function listOfUsers(req, res) {
    try {
        const users = await User.find({});
        res.status(200).json({
            message: "User Complaints fetched successfully on admin",
            users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function listOfBookings(req, res) {
    try {
        // Since bookings is just an array, we'll return it directly
        // In a real application, this would be fetched from a database
        res.status(200).json({ 
            message: 'List of bookings fetched successfully', 
            bookings: bookings 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
export default {
    getComplaint,
    getComplaints,
    acceptComplaint,
    waitingComplaint,
    listOfBookings,
    listOfUsers
}