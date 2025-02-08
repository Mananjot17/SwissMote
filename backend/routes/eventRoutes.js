import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
} from "../controllers/eventController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create-event", protectRoute, createEvent);
router.get("/", protectRoute, getEvents);
router.delete("/:id", protectRoute, deleteEvent);

export default router;
