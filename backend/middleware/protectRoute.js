import jwt from "jsonwebtoken"; // Importing JWT for token verification
import User from "../models/User.js"; // Importing User model to fetch user data

// Middleware to protect routes by verifying the user's authentication status
const protectRoute = async (req, res, next) => {
  try {
    // Get the JWT token from cookies
    const token = req.cookies.jwt;

    if (!token) {
      // Return a 401 Unauthorized response if the token is missing
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      // Return a 401 response if the token is invalid
      return res.status(401).json({ error: "Unauthorized - Invalid user" });
    }

    // Find the user by the ID encoded in the token, excluding the password field
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      // Return a 404 response if the user is not found
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user object to the request for use in subsequent middleware or route handlers
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.log("Error in protectRoute:", error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
