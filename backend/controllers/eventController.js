import Event from "../models/Events.js"; // Import Event model
import { io } from "../server.js"; // Import socket.io instance for real-time communication

// Controller to create a new event
export const createEvent = async (req, res) => {
  try {
    const { eventName, description, date, time, category } = req.body;
    const userId = req.user._id; // Get the ID of the authenticated user

    // Validate required fields
    if (!eventName || !date || !category || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate eventName length
    if (eventName.length < 3 || eventName.length > 100) {
      return res
        .status(400)
        .json({ message: "eventName must be between 3 and 100 characters." });
    }

    // Ensure the event date is in the future
    if (new Date(date) < new Date()) {
      return res.status(400).json({ message: "Date must be in the future." });
    }

    // Check for duplicate event (same eventName, date, and time)
    const existingEvent = await Event.findOne({ eventName, date, time });
    if (existingEvent) {
      return res.status(400).json({
        message:
          "An event with the same eventName, date, and time already exists.",
      });
    }

    // Create and save a new event
    const newEvent = new Event({
      eventName,
      description,
      date,
      time,
      category,
      createdBy: userId,
    });

    if (newEvent) {
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    }
  } catch (error) {
    console.error("Error creating a new Event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to fetch events with pagination, category filtering, and date filtering
export const getEvents = async (req, res) => {
  const { page = 1, limit = 5, category, dateFilter } = req.query;

  const query = {}; // Query object for filtering

  // Apply category filter if provided
  if (category) query.category = category;

  // Apply date filter: upcoming or past events
  if (dateFilter === "upcoming") {
    query.date = { $gte: new Date() };
  } else if (dateFilter === "past") {
    query.date = { $lt: new Date() };
  }

  try {
    // Fetch events with pagination and sorting by date
    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(query); // Get total number of events matching the query

    res.json({
      events,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to delete an event by ID
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(id); // Delete the event
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Controller to update an event by ID
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Create an update object with only the changed fields
    const changedFields = {};
    for (const key in updates) {
      if (updates[key] !== event[key]) {
        changedFields[key] = updates[key];
      }
    }

    // Only update if there are changes
    if (Object.keys(changedFields).length > 0) {
      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { $set: changedFields },
        { new: true, runValidators: true }
      );
      return res.json(updatedEvent);
    } else {
      return res.status(400).json({ message: "No changes detected" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to fetch a single event by ID
export const getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event); // Return the event if found
  } catch (error) {
    console.error("Error fetching the event:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Controller to allow a user to join an event
export const joinEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user has already joined the event
    const alreadyJoined = event.attendees.some(
      (attendee) => attendee.userId.toString() === userId
    );

    if (alreadyJoined) {
      return res
        .status(400)
        .json({ message: "You have already joined this event" });
    }

    // Add the user to the event's attendees list
    event.attendees.push({ userId, joinedAt: new Date() });
    await event.save();

    // Emit a real-time update using socket.io
    const updatedEvent = await Event.findById(eventId);
    io.to(eventId).emit("attendeeUpdate", updatedEvent.attendees.length);

    res.status(200).json({
      message: "Successfully joined the event",
      attendees: event.attendees.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
