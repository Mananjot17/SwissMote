import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDeleteEvent from "../hooks/useDeleteEvent";
import useJoinEvent from "../hooks/useJoinEvent";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

const EventCard = ({ event, onDelete }) => {
  const { deleteEvent, loading: deleting } = useDeleteEvent();
  const { joinEvent, loading: joining } = useJoinEvent();
  const [attendeesCount, setAttendeesCount] = useState(event.attendees.length);

  useEffect(() => {
    socket.emit("joinEventRoom", event._id);

    const handleAttendeeUpdate = (newCount) => {
      setAttendeesCount(newCount);
    };

    socket.on("attendeeUpdate", handleAttendeeUpdate);

    return () => {
      socket.off("attendeeUpdate", handleAttendeeUpdate);
    };
  }, [event._id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmed) return;
    await deleteEvent(event._id);
    onDelete(event._id); // Remove the event from the list
  };

  const handleJoin = async () => {
    const result = await joinEvent(event._id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h4 className="text-xl font-bold text-indigo-800 mb-2">
        {event.eventName}
      </h4>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-500 text-sm mb-4">
        {new Date(event.date).toLocaleString()}
      </p>
      <p className="text-sm text-gray-600 mb-4">Attendees: {attendeesCount}</p>
      <div className="flex justify-between items-center">
        <Link
          to={`/events/${event._id}/edit`}
          className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Update
        </Link>
        <button
          onClick={handleJoin}
          disabled={joining}
          className={`bg-green-500 text-white py-1 px-4 rounded-md transition ${
            joining ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          {joining ? "Joining..." : "Join Event"}
        </button>
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
