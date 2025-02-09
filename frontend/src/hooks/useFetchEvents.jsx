import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch paginated and filtered events
const useFetchEvents = (initialFilters = {}) => {
  const [events, setEvents] = useState([]); // Stores fetched events
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const [error, setError] = useState(null); // Error state for API failures
  const [page, setPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages available
  const [filters, setFilters] = useState(initialFilters); // Filters for event search

  useEffect(() => {
    let cancelRequest = false; // Flag to cancel the request if the component unmounts or filters change

    const fetchEvents = async (reset = false) => {
      setLoading(true);
      setError(null); // Clear previous error before making a new request
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}events`,
          {
            params: { ...filters, page, limit: 5 }, // Apply filters and pagination
            withCredentials: true,
          }
        );

        if (!cancelRequest) {
          const fetchedEvents = response.data.events;

          if (reset) {
            setEvents(fetchedEvents); // Reset events on filter change
          } else {
            // Add new events without duplicates
            setEvents((prevEvents) => [
              ...prevEvents.filter(
                (event) => !fetchedEvents.find((e) => e._id === event._id)
              ),
              ...fetchedEvents,
            ]);
          }

          setTotalPages(response.data.totalPages); // Update total pages
        }
      } catch (error) {
        if (!cancelRequest) {
          setError(error.response?.data?.message || "Failed to load events.");
        }
      } finally {
        if (!cancelRequest) setLoading(false);
      }
    };

    fetchEvents(page === 1); // Fetch events with reset if the page is 1

    return () => {
      cancelRequest = true; // Cancel the request on cleanup
    };
  }, [page, filters]);

  // Function to load more events (for pagination)
  const loadMore = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  // Function to update filters and reset the event list
  const updateFilters = (newFilters) => {
    setPage(1); // Reset to the first page
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return { events, loading, error, loadMore, updateFilters };
};

export default useFetchEvents;
