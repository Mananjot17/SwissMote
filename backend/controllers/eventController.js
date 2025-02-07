import Event from "../models/Events.js";

const createEvent = async (req, res) => {
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

export default createEvent;
