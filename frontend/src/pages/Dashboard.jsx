import React from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import useFetchEvents from "../hooks/useFetchEvents";

const Dashboard = () => {
  const { events, loading, error, loadMore, updateFilters } = useFetchEvents();

  const handleFilterChange = (e) =>
    updateFilters({ [e.target.name]: e.target.value });

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > new Date()
  );
  const pastEvents = events.filter(
    (event) => new Date(event.date) <= new Date()
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 pt-16">
      <DashboardHeader />
      <div className="p-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-700">My Events</h2>
          <Link
            to="/create-event"
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Create New Event
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category:
            </label>
            <select
              name="category"
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All</option>
              <option value="Workshop">Workshop</option>
              <option value="Meetup">Meetup</option>
              <option value="Conference">Conference</option>
              <option value="Webinar">Webinar</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date:
            </label>
            <select
              name="dateFilter"
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        {/* Upcoming Events */}
        <EventSection title="Upcoming Events" events={upcomingEvents} />

        {/* Past Events */}
        <EventSection title="Past Events" events={pastEvents} />

        {/* Load More Button */}
        <div className="mt-10 flex justify-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button
              onClick={loadMore}
              className="bg-indigo-600 text-white py-2 px-8 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Load More
            </button>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

const EventSection = ({ title, events }) => (
  <section className="mb-16">
    <h3 className="text-2xl font-semibold text-indigo-700 mb-6">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.length > 0 ? (
        events.map((event) => <EventCard key={event._id} event={event} />)
      ) : (
        <p className="text-gray-600">No events found.</p>
      )}
    </div>
  </section>
);

const EventCard = ({ event }) => (
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
      <button className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition">
        Delete
      </button>
    </div>
  </div>
);

export default Dashboard;
