import { useState } from "react";
import axios from "axios";

const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEvent = async (eventData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:5000/events/create-event",
        eventData,
        { withCredentials: true }
      );
      return response.data; // Return the response to handle navigation outside the hook
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
      throw err; // Throw error to catch it in the form
    } finally {
      setLoading(false);
    }
  };

  return { createEvent, loading, error };
};

export default useCreateEvent;
