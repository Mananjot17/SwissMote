import axios from "axios"; // For making HTTP requests
import { useState } from "react";
import toast from "react-hot-toast"; // For displaying notifications

// Custom hook for updating an event
const useUpdateEvent = () => {
  const [loading, setLoading] = useState(false); // State to track the update process

  // Function to update an event by ID
  const updateEvent = async (id, updatedData) => {
    setLoading(true); // Start the loading state
    try {
      // Send a PUT request to update the event
      const response = await axios.put(
        `http://localhost:5000/events/${id}`, // Backend endpoint for updating the event
        updatedData, // Data to update the event with
        {
          withCredentials: true, // Include credentials for authentication (cookies, tokens)
        }
      );

      console.log("Data updated successfully"); // Log success message
      return response.data; // Return the updated event data
    } catch (error) {
      // Display an error toast message in case of failure
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // End the loading state
    }
  };

  return { updateEvent, loading }; // Return the updateEvent function and loading state
};

export default useUpdateEvent;
