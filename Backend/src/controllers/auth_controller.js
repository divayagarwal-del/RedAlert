
import mongoose from "mongoose";
import {User} from "../models/user_models.js"
export const createUser = async (req, res) => {
  try {
    const { name, number, password } = req.body;

    const userExists = await User.findOne({ number });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this number" });
    }

    const newUser = new User({ name, number, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};