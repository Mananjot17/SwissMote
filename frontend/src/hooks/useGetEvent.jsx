import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useGetEvent = () => {
  const [loading, setLoading] = useState(false);

  const getEvent = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/events/${id}`, {
        withCredentials: true,
      });
      return response.data; // Return the event data directly
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { getEvent, loading };
};

export default useGetEvent;
