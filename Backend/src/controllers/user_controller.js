import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user_models.js";
import { Complaint } from "../models/complaint_models.js";
import bookings from "../models/bookings.js";

// REGISTER
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user in DB
    const newUser = new User({ username, password: passwordHash });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

async function getComplaints(req, res) {
  try {
    const { id } = req.user;
    const complaints = await Complaint.find({
      user: id,
    })

    res.status(200).json({
      message: "User Complaint fetched successfully",
      complaints
    });

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}


async function getBookings(req, res) {
  try {
    const { id } = req.user;
    const bk = bookings.filter(booking => booking.user === id);
    res.status(200).json({ message: 'User bookings found successfully', bookings: bk })
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const registerComplaint = async (req, res) => {
  try {
    const { title, tags, description, photos, roomIds } = req.body;
    const userId = req.user.id; // comes from auth middleware after JWT verify

    const complaint = new Complaint({
      title,
      tags,
      description,
      user: userId
    });

    await complaint.save();

    // Also store complaint reference in user's complaints array
    await User.findByIdAndUpdate(userId, {
      $push: { complaints: complaint._id }
    });

    res.status(201).json({ message: "Complaint registered successfully", complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

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

async function closeComplaint(req, res) {
  const { complaintId } = req.params;

  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(complaintId, {
      status: 'Finished'
    })

    res.status(200).json({ message: 'Complaint finshed successfully', complaint: updatedComplaint })
  }
  catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export default {
  login,
  register,
  registerComplaint,
  getComplaint,
  closeComplaint,
  getBookings,
  getComplaints,
}