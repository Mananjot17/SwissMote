import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetEvent from "../hooks/useGetEvent.jsx";
import useUpdateEvent from "../hooks/useUpdateEvent.jsx";

const UpdateEvent = ({ onClose }) => {
  const { id } = useParams();
  const { getEvent } = useGetEvent();
  const { updateEvent } = useUpdateEvent();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: "",
    category: "",
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvent(id);
      if (event) {
        setFormData({
          eventName: event.eventName || "",
          category: event.category || "",
          date: event.date ? event.date.split("T")[0] : "",
          time: event.time || "",
          description: event.description || "",
        });
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateEvent(id, formData);
    if (success) {
      navigate("/"); // Navigate back to the event list or another appropriate page
    }
  };

  const categories = ["Conference", "Workshop", "Meetup", "Webinar", "Other"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-6 text-center md:text-left">
          Update Event
        </h2>
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
            <Link to="/">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                onClick={onClose}
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
