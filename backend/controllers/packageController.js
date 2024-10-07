// controllers/packageController.js
import Package from '../models/packageModel.js'; // Import the Package model
import userModel from '../models/userModel.js'; // Import the User model


// Join package controller
export const joinPackage = async (req, res) => {
  const { userId, packname, price, startDate, validity } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new package document
    const newPackage = new Package({
      userId,
      packname,
      price,
      startDate,
      validity, // validity in days
    });

    // Save the new package
    const savedPackage = await newPackage.save();

    res.status(200).json({ message: 'Package joined successfully!', package: savedPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getUserPackages = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userPackages = await Package.find({ userId }).select('packname startDate validity');

    res.status(200).json(userPackages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
