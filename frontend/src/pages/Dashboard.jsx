// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import DashboardHeader from "../components/DashboardHeader";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > new Date()
  );
  const pastEvents = events.filter(
    (event) => new Date(event.date) <= new Date()
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <div className="p-8">
        {/* Create New Event Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">My Events</h2>
          <Link
            to="/create-event"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Create New Event
          </Link>
        </div>

        {/* Upcoming Events */}
        <section className="mb-12">
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">
            Upcoming Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <p>No upcoming events.</p>
            )}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">
            Past Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <p>No past events.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const EventCard = ({ event, handleDelete }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h4 className="text-xl font-bold mb-2">{event.name}</h4>
    <p className="text-gray-700 mb-2">{event.description}</p>
    <p className="text-gray-500 text-sm mb-4">
      {new Date(event.date).toLocaleString()}
    </p>
    <div className="flex justify-between">
      <Link
        to={`/events/${event._id}/edit`}
        className="text-indigo-600 hover:underline"
      >
        Update
      </Link>
      <button
        onClick={() => handleDelete(event._id)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  </div>
);

export default Dashboard;
