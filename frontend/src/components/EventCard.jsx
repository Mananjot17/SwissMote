import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDeleteEvent from "../hooks/useDeleteEvent"; // Custom hook for deleting events
import useJoinEvent from "../hooks/useJoinEvent"; // Custom hook for joining events
import { io } from "socket.io-client"; // Socket.io client for real-time updates

// Initialize socket connection (make sure the server is running at this address)
const socket = io("http://localhost:5000");

const EventCard = ({ event, onDelete }) => {
  // Custom hook to handle event deletion
  const { deleteEvent, loading: deleting } = useDeleteEvent();

  // Custom hook to handle joining the event
  const { joinEvent, loading: joining } = useJoinEvent();

  // State to track the current number of attendees
  const [attendeesCount, setAttendeesCount] = useState(event.attendees.length);

  // useEffect to join the event room and listen for attendee updates in real time
  useEffect(() => {
    socket.emit("joinEventRoom", event._id); // Join a specific event room on the server

    // Update the attendee count when the server sends an update
    const handleAttendeeUpdate = (newCount) => {
      setAttendeesCount(newCount);
    };

    socket.on("attendeeUpdate", handleAttendeeUpdate);

    // Cleanup function to leave the event room and remove the event listener
    return () => {
      socket.off("attendeeUpdate", handleAttendeeUpdate);
    };
  }, [event._id]);

  // Handle event deletion with confirmation
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmed) return;

    await deleteEvent(event._id); // Call the custom hook to delete the event
    onDelete(event._id); // Notify the parent component to remove this event from the list
  };

  // Handle joining the event
  const handleJoin = async () => {
    await joinEvent(event._id); // Call the custom hook to join the event
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      {/* Event name */}
      <h4 className="text-xl font-bold text-indigo-800 mb-2">
        {event.eventName}
      </h4>

      {/* Event description */}
      <p className="text-gray-700 mb-4">{event.description}</p>

      {/* Event date and time */}
      <p className="text-gray-500 text-sm mb-4">
        {new Date(event.date).toLocaleString()}
      </p>

      {/* Number of attendees */}
      <p className="text-sm text-gray-600 mb-4">Attendees: {attendeesCount}</p>

      <div className="flex justify-between items-center">
        {/* Link to edit the event */}
        <Link
          to={`/events/${event._id}/edit`}
          className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Update
        </Link>

        {/* Join Event button */}
        <button
          onClick={handleJoin}
          disabled={joining}
          className={`bg-green-500 text-white py-1 px-4 rounded-md transition ${
            joining ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          {joining ? "Joining..." : "Join Event"}
        </button>

        {/* Delete Event button */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`bg-red-500 text-white py-1 px-4 rounded-md transition ${
            deleting ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          }`}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
