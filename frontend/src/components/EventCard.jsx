import React, { useState } from "react";
import { Link } from "react-router-dom";
import useDeleteEvent from "../hooks/useDeleteEvent.jsx";

const EventCard = ({ event, onDelete }) => {
  const { deleteEvent, loading } = useDeleteEvent();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmed) return;

    await deleteEvent(event._id);
    onDelete(event._id); // Remove the event from the list in the parent component
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
      <div className="flex justify-between">
        <Link
          to={`/events/${event._id}/edit`}
          className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Update
        </Link>
        <button
          onClick={handleDelete}
          disabled={loading}
          className={`bg-red-500 text-white py-1 px-4 rounded-md transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          }`}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
