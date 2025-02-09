import jwt from "jsonwebtoken"; // Import the JSON Web Token library

/**
 * Generates a JWT token for the given user ID and sets it as an HTTP-only cookie in the response.
 *
 * @param {string} userId - The unique ID of the user for whom the token is generated.
 * @param {object} res - The Express response object to set the cookie.
 */
const generateTokenAndSetCookie = (userId, res) => {
  // Generate a JWT token with the userId as the payload and a 15-day expiration
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", // Token will expire in 15 days
  });

  // Set the generated token as a cookie in the response
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expiry set to 15 days in milliseconds
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie (security feature)
    sameSite: "Strict", // Ensures the cookie is only sent for same-site requests to prevent CSRF attacks
    secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS (for development, it's false; for production, change it to true)
  });
};

export default generateTokenAndSetCookie; // Export the function for use in other files
