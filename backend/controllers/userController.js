import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto'; 


dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});


const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: 'aurafitness00@gmail.com',
    to: email,
    subject: 'Welcome to AuraFitness!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
        <div style="text-align: center;">
          <img src="https://i.imgur.com/inRl3ju.png" alt="Welcome to AuraFitness" style="width: 100%; height: auto;">
        </div>
        <h1 style="color: #333;">Hi ${name},</h1>
        <p style="color: #555; line-height: 1.6;">
          Welcome to <strong>AuraFitness</strong>! We are thrilled to have you as part of our fitness community. By joining us, you're taking the first step towards achieving your fitness goals and leading a healthier lifestyle.
        </p>
        <p style="color: #555; line-height: 1.6;">
          As a member, you'll have access to exclusive workouts, fitness programs, and expert advice to guide you on your journey. Here are some things you can do next:
        </p>
        <ul style="color: #555; line-height: 1.6;">
          <li>Explore your personalized dashboard</li>
          <li>Set up your workout schedule</li>
          <li>Track your progress and milestones</li>
        </ul>
        <div style="text-align: center; margin: 20px 0;">
          <a href="http://localhost:3000/login" style="padding: 10px 20px; background-color: #FFDE59; color: black; text-decoration: none; border-radius: 5px;">Log in to your account</a>
        </div>
        <p style="color: #555; line-height: 1.6;">
          We are excited to support you in reaching your fitness goals. Feel free to contact us anytime for assistance or if you have questions. Together, let's make every workout count!
        </p>
        <p style="color: #555; line-height: 1.6;">
          Best regards,<br>
          <strong>AuraFitness Team</strong>
        </p>
        <footer style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
          © 2024 AuraFitness. All rights reserved.<br>
          Follow us on: 
          <a href="https://twitter.com/AuraFitness" style="color: #007BFF; text-decoration: none;">Twitter</a> | 
          <a href="https://instagram.com/AuraFitness" style="color: #007BFF; text-decoration: none;">Instagram</a> | 
          <a href="https://facebook.com/AuraFitness" style="color: #007BFF; text-decoration: none;">Facebook</a>
        </footer>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};



const JWT_SECRET = process.env.JWT_SECRET;

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      userType: user.userType,
      mobile: user.mobile,
      height: user.height,
      weight: user.weight,
      birthday: user.birthday,
      address: user.address,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, userType, mobile, height, weight, birthday, address } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    userType,
    mobile,
    height,
    weight,
    birthday,
    address,
  });

  if (user) {
    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    // Generate token and send response
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      mobile: user.mobile,
      height: user.height,
      weight: user.weight,
      birthday: user.birthday,
      address: user.address,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      mobile: user.mobile,
      height: user.height,
      weight: user.weight,
      birthday: user.birthday,
      address: user.address,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    user.userType = req.body.userType || user.userType;
    user.height = req.body.height || user.height;
    user.weight = req.body.weight || user.weight;
    user.birthday = req.body.birthday || user.birthday;
    user.address = req.body.address || user.address;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      userType: updatedUser.userType,
      mobile: updatedUser.mobile,
      height: updatedUser.height,
      weight: updatedUser.weight,
      birthday: updatedUser.birthday,
      isAdmin: updatedUser.isAdmin,
      address: updatedUser.address,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Delete own account (User)
// @route   DELETE /api/users/profile
// @access  Private
const UserdeleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User account deleted' });
    logoutUser(req, res);  // Log the user out after deletion
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Admin Get User Profile
// @route   GET /api/users/:id
// @access  Private/Admin
const adminGetProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      mobile: user.mobile,
      height: user.height,
      weight: user.weight,
      birthday: user.birthday,
      address: user.address,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Admin Update User Profile
// @route   PUT /api/users/:id
// @access  Private/Admin
const adminUpdateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    user.userType = req.body.userType || user.userType;
    user.height = req.body.height || user.height;
    user.weight = req.body.weight || user.weight;
    user.birthday = req.body.birthday || user.birthday;
    user.address = req.body.address || user.address;

    // Update isAdmin if provided in the request body
    if (req.body.isAdmin !== undefined) {
      user.isAdmin = req.body.isAdmin;
    }

    // Update password if provided
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      userType: updatedUser.userType,
      mobile: updatedUser.mobile,
      height: updatedUser.height,
      weight: updatedUser.weight,
      birthday: updatedUser.birthday,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin, // Include isAdmin in the response
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


// @desc    Admin create a new user
// @route   POST /api/admin/users
// @access  Admin
const adminCreateUser = asyncHandler(async (req, res) => {
  const { name, email, password, userType, mobile, height, weight, birthday, isAdmin, address } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    password,
    userType,
    mobile,
    height,
    weight,
    birthday,
    isAdmin, // Include the isAdmin field
    address,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      mobile: user.mobile,
      height: user.height,
      weight: user.weight,
      birthday: user.birthday,
      isAdmin: user.isAdmin, // Include isAdmin in the response
      address: user.address,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


//If user forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log('Received email:', email);

  const user = await User.findOne({ email });

  if (!user) {
    console.log('User not found for email:', email);
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 minutes expiry
  await user.save();

  // Send reset link via email
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
  const message = `You requested a password reset. Click on the link to reset your password: ${resetUrl}`;

  try {
    // Use Nodemailer or another service to send an email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: message,
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(500).json({ message: 'Email could not be sent' });
  }
};


//User reset their password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid token or token expired' });
  }

  // Hash the new password
  user.password = password; // You need to hash this password before saving
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  
  // Ensure the password is hashed
  await user.save();

  res.status(200).json({ message: 'Password reset successful' });
};




export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  adminGetProfile,
  adminUpdateProfile,
  UserdeleteUser,
  adminCreateUser,
  sendWelcomeEmail,
  forgotPassword,
  resetPassword

};
