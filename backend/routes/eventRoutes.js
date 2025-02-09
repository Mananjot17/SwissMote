import express from "express"; // Import express to create the router
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
  joinEvent,
} from "../controllers/eventController.js"; // Import event-related controller functions
import protectRoute from "../middleware/protectRoute.js"; // Middleware to protect routes and ensure only authenticated users can access them

const router = express.Router(); // Create a new router instance

// @route   POST /api/events/create-event
// @desc    Create a new event
// @access  Protected
router.post("/create-event", protectRoute, createEvent);

// @route   GET /api/events/
// @desc    Get a list of events with optional filters (pagination, category, date filter)
// @access  Protected
router.get("/", protectRoute, getEvents);

// @route   DELETE /api/events/:id
// @desc    Delete an event by its ID
// @access  Protected
router.delete("/:id", protectRoute, deleteEvent);

// @route   PUT /api/events/:id
// @desc    Update an existing event by its ID with new details
// @access  Protected
router.put("/:id", protectRoute, updateEvent);

// @route   GET /api/events/:id
// @desc    Get details of a specific event by its ID
// @access  Protected
router.get("/:id", protectRoute, getEvent);

// @route   POST /api/events/:id/join
// @desc    Join a specific event by its ID
// @access  Protected
router.post("/:id/join", protectRoute, joinEvent);

export default router; // Export the router to be used in the main app
