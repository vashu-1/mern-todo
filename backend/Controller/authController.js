import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    const existuser = await User.findOne({ email });

    if (existuser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const avaluser = await User.findOne({ email });
    if (!avaluser) {
      return res.status(400).json({
        success: false,
        message: 'User not found, please register',
      });
    }

    const isMatch = await bcrypt.compare(password, avaluser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ id: avaluser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    const user = {
      id: avaluser._id,
      name: avaluser.name,
      email: avaluser.email,
    };

    res
      .status(200)
      .cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })
      .json({
        success: true,
        message: 'Login successful',
        user,
        token,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie('token', '', {
        maxAge: 0,
        httpOnly: true,
        sameSite: 'strict',
      })
      .json({
        success: true,
        message: 'Logout successful',
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.params.id;

    const updatedData = { name, email };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
