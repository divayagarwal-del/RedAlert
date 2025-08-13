import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';

export const addUser = async (req, res) => {
  try {
    const { name, number, password } = req.body;

    // Simple validation
    if (!name || !number || !password) {
      return res.status(400).json({ message: 'Name, number, and password are required' });
    }

    // Check if number is already registered
    const existingUser = await User.findOne({ number });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this number already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      number,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        number: user.number
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
