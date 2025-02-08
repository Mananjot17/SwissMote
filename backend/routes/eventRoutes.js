import express from "express";
import { createEvent, getEvents } from "../controllers/eventController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create-event", protectRoute, createEvent);
router.get("/", protectRoute, getEvents);

export default router;
