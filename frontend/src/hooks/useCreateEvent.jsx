import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);

  const createEvent = async (eventData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/events/create-event",
        eventData,
        { withCredentials: true }
      );
      return response.data; // Return the response to handle navigation outside the hook
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createEvent, loading };
};

export default useCreateEvent;
