import express from "express";
import {
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
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register New User (as Guest or Travel Agent)
router.post("/", registerUser);

// Login User
router.post("/auth", authUser);

// Logout User
router.post("/logout", logoutUser);

// User Delete Their Own Profile
router.delete("/", protect, UserdeleteUser);

// User Get and Update Their Own Profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin Get All Users
router.get("/all", protect, isAdmin, getAllUsers);

// Admin Get Specific User Profile
router.get("/specific/:id", protect, isAdmin, adminGetProfile);

// Admin Update Specific User Profile
router.put("/specific/:id", protect, isAdmin, adminUpdateProfile);

// Admin Delete Specific User Profile
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;
