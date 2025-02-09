import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Custom hook for joining an event
const useJoinEvent = () => {
  const [loading, setLoading] = useState(false); // State to track request progress

  // Function to join an event using its ID
  const joinEvent = async (eventId) => {
    setLoading(true); // Set loading state to true before the request starts
    try {
      // Send a POST request to join the event
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}events/${eventId}/join`, // Backend endpoint for joining the event
        {}, // Empty request body (can be extended if needed)
        { withCredentials: true } // Include credentials for authentication
      );

      return response.data; // Return the response data (e.g., updated attendee count or success message)
    } catch (error) {
      // Handle error and display an appropriate toast message
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Reset loading state once the request completes (success or error)
    }
  };

  return { joinEvent, loading }; // Return the joinEvent function and loading state
};

export default useJoinEvent;
