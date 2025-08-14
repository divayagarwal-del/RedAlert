import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user_models.js';

export const loginUser = async (req, res) => {
  try {
    const { number, password } = req.body;

    // Check for required fields
    if (!number || !password) {
      return res.status(400).json({ message: 'Number and password are required' });
    }

    // Find the user by number
    const user = await User.findOne({ number });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, number: user.number },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Success
    res.status(200).json({
      message: 'Login successful',
      token,
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