import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
toast;

const useDeleteEvent = () => {
  const [loading, setLoading] = useState(false);

  const deleteEvent = async (eventId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/events/${eventId}`, {
        withCredentials: true,
      }); // Replace with your API endpoint
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { deleteEvent, loading };
};

export default useDeleteEvent;
