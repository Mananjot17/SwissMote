// src/hooks/useRegister.js
import { useState } from "react";
import axios from "axios"; // For making HTTP requests
import { useAuthContext } from "../context/AuthContext.jsx"; // To manage authentication state
import toast from "react-hot-toast"; // For displaying notifications

// Custom hook for user registration
const useRegister = () => {
  const [loading, setLoading] = useState(false); // State to track the registration process
  const { setAuthUser } = useAuthContext(); // Access setAuthUser to update the authenticated user state

  // Function to register a new user
  const register = async (fullname, email, password) => {
    setLoading(true); // Set loading to true at the start of the request
    try {
      // Send POST request to the registration endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/register`, // Backend registration endpoint
        {
          fullname, // User's full name
          email, // User's email
          password, // User's password
        },
        {
          withCredentials: true, // Include credentials for authentication (cookies, tokens)
        }
      );

      const data = response.data; // Extract response data
      console.log("Registration successful:", data); // Log success for debugging

      // Store user data in local storage for persistence
      localStorage.setItem("user-data", JSON.stringify(data));
      setAuthUser(data); // Update authenticated user state with the registered user data

      // Handle successful registration (e.g., navigation or additional actions)
    } catch (error) {
      // Show an error message if the request fails
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Set loading to false after the request completes (success or error)
    }
  };

  return { register, loading }; // Return the register function and loading state
};

export default useRegister;
