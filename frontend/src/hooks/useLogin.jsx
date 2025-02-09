// src/hooks/useLogin.js
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx"; // Import the AuthContext to manage authentication state
import toast from "react-hot-toast"; // For showing notifications

// Custom hook for user login
const useLogin = () => {
  const [loading, setLoading] = useState(false); // State to track the login process
  const { setAuthUser } = useAuthContext(); // Access setAuthUser to update the authenticated user in context

  // Function to handle user login
  const login = async (email, password) => {
    setLoading(true); // Set loading to true at the start of the login request
    try {
      // Send POST request to the login endpoint with email and password
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", // Backend login endpoint
        {
          email, // User's email
          password, // User's password
        },
        {
          withCredentials: true, // Include credentials (e.g., cookies) for authentication
        }
      );

      const data = response.data; // Extract response data
      console.log("Login successful:", data); // Log success message for debugging

      // Store user data in local storage for persistence
      localStorage.setItem("user-data", JSON.stringify(data));

      // Update the authUser state in the context
      setAuthUser(data);
    } catch (error) {
      // Handle errors and show an appropriate toast notification
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  return { login, loading }; // Return the login function and loading state
};

export default useLogin;
