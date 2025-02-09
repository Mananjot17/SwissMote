import Event from "../models/Events.js";
import { io } from "../server.js";

export const createEvent = async (req, res) => {
  try {
    const { eventName, description, date, time, category } = req.body;
    const userId = req.user._id;

    if (!eventName || !date || !category || !time || !eventName) {
      return res.status(400).json({ message: "All fields are must" });
    }

    if (eventName.length < 3 || eventName.length > 100) {
      return res
        .status(400)
        .json({ message: "eventName must be between 3 and 100 characters." });
    }

    if (new Date(date) < new Date()) {
      return res.status(400).json({ message: "Date must be in the future." });
    }

    const existingEvent = await Event.findOne({ eventName, date, time });
    if (existingEvent) {
      return res.status(400).json({
        message: "An event with the same eventName, date, already exists.",
      });
    }

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
    console.error("Error creating a new Event :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// eventsController.js
export const getEvents = async (req, res) => {
  const { page = 1, limit = 5, category, dateFilter } = req.query;

  const query = {};

  // Category Filter
  if (category) query.category = category;

  // Date Filter
  if (dateFilter === "upcoming") {
    query.date = { $gte: new Date() };
  } else if (dateFilter === "past") {
    query.date = { $lt: new Date() };
  }

  try {
    const events = await Event.find(query)
      .sort({ date: 1 }) // Sort by date
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(query);

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

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const event = await Event.findById(id); // Fetch the existing document

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Create an update object with only changed fields
    const changedFields = {};
    for (const key in updates) {
      if (updates[key] !== event[key]) {
        changedFields[key] = updates[key];
      }
    }

    // Only update if there are changed fields
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

export const getEvent = async (req, res) => {
  const { id } = req.params; // Extracting the event ID from the request params

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

export const joinEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;
    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ message: "Event not found" });

    const alreadyJoined = event.attendees.some(
      (attendee) => attendee.userId.toString() === userId
    );

    if (alreadyJoined) {
      return res
        .status(400)
        .json({ message: "You have already joined this event" });
    }

    event.attendees.push({ userId, joinedAt: new Date() });
    await event.save();

    const updatedEvent = await Event.findById(eventId); // Fetch updated event
    io.to(eventId).emit("attendeeUpdate", updatedEvent.attendees.length);

    res.status(200).json({
      message: "Successfully joined the event",
      attendees: event.attendees.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
