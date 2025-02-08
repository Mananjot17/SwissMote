import React from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import useFetchEvents from "../hooks/useFetchEvents";

const Dashboard = () => {
  const { events, loading, error, loadMore, updateFilters } = useFetchEvents();

  const handleFilterChange = (e) => {
    updateFilters({ [e.target.name]: e.target.value });
  };

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

        {/* Filters */}
        <div className="mb-8 flex gap-6">
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
        <section className="mb-12">
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">
            Upcoming Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard key={event._id} event={event} />
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
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <p>No past events.</p>
            )}
          </div>
        </section>

        {/* Load More Button */}
        <div className="mt-8 flex justify-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button
              onClick={loadMore}
              className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700"
            >
              Load More
            </button>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event }) => (
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
      <button className="text-red-600 hover:underline">Delete</button>
    </div>
  </div>
);

export default Dashboard;
