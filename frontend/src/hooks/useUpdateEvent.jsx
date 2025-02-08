import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateEvent = () => {
  const [loading, setLoading] = useState(false);
  const updateEvent = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/events/${id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      console.log("data updated successfully");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateEvent, loading };
};

export default useUpdateEvent;
