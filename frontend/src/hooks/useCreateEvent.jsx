import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createEvent = async (eventData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/events/create-event",
        eventData,
        { withCredentials: true }
      );

      navigate("/");
      // Return the response to handle navigation outside the hook
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
