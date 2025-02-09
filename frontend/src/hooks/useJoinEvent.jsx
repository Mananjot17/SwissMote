import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useJoinEvent = () => {
  const [loading, setLoading] = useState(false);

  const joinEvent = async (eventId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/events/${eventId}/join`,
        {},
        { withCredentials: true }
      );
      return response.data; // Returns updated attendee count or success message
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { joinEvent, loading };
};

export default useJoinEvent;
