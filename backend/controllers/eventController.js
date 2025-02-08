import Event from "../models/Events.js";

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
