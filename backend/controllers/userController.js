import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { uploadToCloudinary } from "../utils/cloudinaryUtils.js";

// User Registration
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    
    // Upload profile picture to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file.buffer, "user-profiles");
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture: cloudinaryResult.secure_url,
    });
    await newUser.save();
    res.status(201).json({ 
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Include role in JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true, // ✅ Prevents JavaScript access (XSS protection)
      secure: process.env.NODE_ENV === "production", // ✅ HTTPS only in production
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax", // ✅ Lax for development (allows cookies across localhost ports)
      maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 7 days
    });
    res.status(200).json({ 
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get User Profile

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
