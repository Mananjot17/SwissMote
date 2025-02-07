import express from "express";
import createEvent from "../controllers/eventController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create-event", protectRoute, createEvent);

export default router;
