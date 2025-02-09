import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
  joinEvent,
} from "../controllers/eventController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create-event", protectRoute, createEvent);
router.get("/", protectRoute, getEvents);
router.delete("/:id", protectRoute, deleteEvent);
router.put("/:id", protectRoute, updateEvent);
router.get("/:id", protectRoute, getEvent);
router.post("/:id/join", protectRoute, joinEvent);

export default router;
