import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateEvent from "../hooks/useCreateEvent";

const CreateEventForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    eventName: "",
    category: "",
    date: "",
    time: "",
    description: "",
  });

  const categories = ["Conference", "Workshop", "Meetup", "Webinar", "Other"];
  const navigate = useNavigate();
  const { createEvent, loading, error } = useCreateEvent();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createEvent(formData);
    if (success) {
      navigate("/"); // Redirect to home on success
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-6 text-center md:text-left">
          Create New Event
        </h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                name="eventName"
                placeholder="Enter event name"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.eventName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                name="time"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter event description"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
              onClick={() => (onClose ? onClose() : navigate("/"))}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
