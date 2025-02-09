import User from "../models/User.js"; // Import User model
import generateTokenAndSetCookie from "../Utils/generateToken.js"; // Utility function to generate token and set cookie
import bcrypt from "bcryptjs"; // Library for hashing passwords

// Handle user registration
export const handleRegister = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    // Save the new user and generate a token if successful
    if (newUser) {
      await newUser.save();
      generateTokenAndSetCookie(newUser._id, res); // Generate JWT and set as cookie

      // Respond with the new user's details (excluding password)
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Server error" }); // Internal server error
  }
};

// Handle user login
export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if the provided password matches the stored hash
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token and set it as a cookie for authentication
    generateTokenAndSetCookie(user._id, res);

    // Respond with user data (excluding password)
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Server error" }); // Internal server error
  }
};

// Handle user logout
export const handleLogout = async (req, res) => {
  try {
    // Clear the JWT cookie by setting its maxAge to 0
    res.cookie("jwt", "", { maxAge: 0 });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal server error" }); // Internal server error
  }
};
