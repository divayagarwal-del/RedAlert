// src/controllers/complaint_controller.js
import bookings from "../models/bookings.js";
import { Complaint } from "../models/complaint_models.js";
import { User } from "../models/user_models.js";

async function acceptComplaint(req, res) {
    const { complaintId } = req.params;
    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(complaintId, {
            status: "Accepted"
        }, { new: true })

        res.status(200).json({ message: 'Complaint Accepted successfully', complaint: updatedComplaint })
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function updateComplaintStatus(req, res) {
    const { complaintId } = req.params;
    const { status } = req.body;
    
    try {
        // Validate status
        const validStatuses = ['New', 'Accepted', 'Finished', 'Waiting'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status provided' });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(complaintId, {
            status: status
        }, { new: true });

        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json({ 
            message: `Complaint status updated to ${status} successfully`, 
            complaint: updatedComplaint 
        });
    } catch (err) {
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

async function getComplaintTagsStats(req, res) {
    try {
        const complaints = await Complaint.find({});
        
        // Count all tags from all complaints
        const tagCounts = {};
        let totalComplaints = 0;
        
        complaints.forEach(complaint => {
            if (complaint.tags && Array.isArray(complaint.tags)) {
                complaint.tags.forEach(tag => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
                totalComplaints++;
            }
        });
        
        // Convert to array format for the pie chart
        const tagsData = Object.entries(tagCounts).map(([tag, count], index) => ({
            id: index,
            label: tag,
            value: count
        }));
        
        res.status(200).json({
            message: "Complaint tags statistics fetched successfully",
            tagsData,
            totalComplaints,
            tagCounts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function getMonthlyComplaintStats(req, res) {
    try {
        const complaints = await Complaint.find({});
        
        // Initialize monthly data for the last 12 months
        const monthlyData = {};
        const currentDate = new Date();
        
        // Create entries for the last 12 months
        for (let i = 11; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const monthKey = date.toLocaleString('default', { month: 'short' });
            monthlyData[monthKey] = 0;
        }
        
        // Count complaints by month based on createdAt timestamp
        complaints.forEach(complaint => {
            if (complaint.createdAt) {
                const complaintDate = new Date(complaint.createdAt);
                const monthKey = complaintDate.toLocaleString('default', { month: 'short' });
                if (monthlyData.hasOwnProperty(monthKey)) {
                    monthlyData[monthKey]++;
                }
            }
        });
        
        // Convert to array format for the bar chart
        const monthlyComplaintsData = Object.entries(monthlyData).map(([month, count]) => ({
            month: month,
            complaints: count
        }));
        
        res.status(200).json({
            message: "Monthly complaint statistics fetched successfully",
            monthlyComplaintsData,
            totalComplaints: complaints.length
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
    updateComplaintStatus,
    waitingComplaint,
    listOfBookings,
    listOfUsers,
    getComplaintTagsStats,
    getMonthlyComplaintStats
}