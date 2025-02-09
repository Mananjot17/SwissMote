// import { useState, useEffect } from "react";
// import axios from "axios";

// const useFetchEvents = (initialFilters = {}) => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [filters, setFilters] = useState(initialFilters);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/events", {
//           params: { ...filters, page, limit: 5 },
//           withCredentials: true,
//         });

//         setEvents((prevEvents) => [...prevEvents, ...response.data.events]);
//         setTotalPages(response.data.totalPages);
//       } catch (error) {
//         setError(error.response?.data?.message || "Failed to load events.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [page, filters]);

//   const loadMore = () => {
//     if (page < totalPages) setPage(page + 1);
//   };

//   const updateFilters = (newFilters) => {
//     setEvents([]); // Reset events when filters change
//     setPage(1);
//     setFilters((prev) => ({ ...prev, ...newFilters }));
//   };

//   return { events, loading, error, loadMore, updateFilters };
// };

// export default useFetchEvents;

import { useState, useEffect } from "react";
import axios from "axios";

const useFetchEvents = (initialFilters = {}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const fetchEvents = async (reset = false) => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/events", {
          params: { ...filters, page, limit: 5 },
          withCredentials: true,
        });

        if (reset) {
          setEvents(response.data.events); // Reset events on filter change
        } else {
          setEvents((prevEvents) => [
            ...prevEvents.filter(
              (event) => !response.data.events.find((e) => e._id === event._id)
            ),
            ...response.data.events,
          ]);
        }

        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents(page === 1); // Reset only if the page is 1
  }, [page, filters]);

  const loadMore = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const updateFilters = (newFilters) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return { events, loading, error, loadMore, updateFilters };
};

export default useFetchEvents;
