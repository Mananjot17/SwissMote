import { useState } from "react";
import { useAuthContext } from "../context/AuthContext"; // To access and update authentication state
import axios from "axios"; // For HTTP requests
import toast from "react-hot-toast"; // For showing notifications
import { useNavigate } from "react-router-dom"; // For navigation

// Custom hook for user logout
const useLogout = () => {
  const [loading, setLoading] = useState(false); // State to track the logout process
  const { setAuthUser } = useAuthContext(); // Access setAuthUser to clear the authenticated user
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Function to handle user logout
  const logout = async () => {
    setLoading(true); // Set loading to true at the start of the logout request

    try {
      // Send POST request to the logout endpoint
      await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/logout`, // Backend logout endpoint
        {},
        {
          withCredentials: true, // Include credentials (e.g., cookies) for proper logout
        }
      );

      console.log("Logout successful"); // Log success message for debugging
      localStorage.removeItem("user-data"); // Remove user data from local storage
      setAuthUser(null); // Clear the authenticated user from context
      navigate("/login"); // Redirect the user to the login page
    } catch (error) {
      // Show an error notification in case of failure
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  return { logout, loading }; // Return the logout function and loading state
};

export default useLogout;
