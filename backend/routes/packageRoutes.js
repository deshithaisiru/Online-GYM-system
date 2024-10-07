import express from 'express';
import { joinPackage, getUserPackages } from '../controllers/packageController.js'; // Import the package controllers

const router = express.Router();

// POST endpoint to join a package
router.post('/join', joinPackage); // Endpoint for users to join a package

// GET endpoint to fetch all enrolled packages by user ID
router.get('/user/:userId', getUserPackages); // Endpoint to get the packages for a specific user

export default router;
