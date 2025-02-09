import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Custom hook for creating an event
const useCreateEvent = () => {
  const [loading, setLoading] = useState(false); // Loading state to indicate request progress
  const navigate = useNavigate(); // Hook to navigate to different routes

  const createEvent = async (eventData) => {
    try {
      setLoading(true); // Start loading before the request
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}events/create-event`, // Backend endpoint to create an event
        eventData, // Event data sent in the request body
        { withCredentials: true } // Include credentials for authentication (cookies, tokens)
      );

      toast.success("Event created successfully!"); // Show success toast message
      navigate("/"); // Navigate to the homepage after successful event creation
      return response.data; // Return the response for further handling if needed
    } catch (error) {
      // Display error message in case of failure
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading once the request is complete (success or error)
    }
  };

  return { createEvent, loading }; // Return the createEvent function and loading state
};

export default useCreateEvent;
