// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import { Server } from "socket.io";
// import http from "http";
// import authRoutes from "./routes/authRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
// import cookieParser from "cookie-parser";

// dotenv.config();
// const app = express();
// const server = http.createServer(app);

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Your frontend URL
//     credentials: true, // Allow sending cookies
//   })
// );

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// app.use("/api/auth", authRoutes);
// app.use("/events", eventRoutes);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import http from "http";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const server = http.createServer(app);

// WebSocket setup
const io = new Server(server, {
  cors: {
    origin: "https://swiss-mote.vercel.app",
    credentials: true,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://swiss-mote.vercel.app",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRoutes);
app.use("/events", eventRoutes);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinEventRoom", (eventId) => {
    socket.join(eventId);
    console.log(`Client joined room: ${eventId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

export { io }; // Exporting io for use in the controller
