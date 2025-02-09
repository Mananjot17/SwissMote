import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Custom hook for fetching a single event by its ID
const useGetEvent = () => {
  const [loading, setLoading] = useState(false); // State to indicate if the request is in progress

  // Function to get a specific event by ID
  const getEvent = async (id) => {
    setLoading(true); // Set loading state to true before starting the request
    try {
      // Send a GET request to fetch the event by its ID
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}events/${id}`,
        {
          withCredentials: true, // Include credentials for authentication (cookies, tokens)
        }
      );

      return response.data; // Return the event data if the request is successful
    } catch (error) {
      // Handle error and show an appropriate toast message
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Reset loading state after the request completes (success or error)
    }
  };

  return { getEvent, loading }; // Return the getEvent function and loading state
};

export default useGetEvent;
