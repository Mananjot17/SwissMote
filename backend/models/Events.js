import mongoose from "mongoose"; // Importing Mongoose for schema and model creation

// Define the event schema with various fields and validation rules
const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String, // String type for the event name
      required: true, // This field is mandatory
      trim: true, // Removes leading and trailing spaces
    },
    description: {
      type: String, // String type for the event description
      required: true, // This field is mandatory
      trim: true, // Removes extra spaces from the start and end
    },
    date: {
      type: Date, // Date type for event date
      required: true, // This field is mandatory
    },
    time: {
      type: String, // String type for event time (format can be flexible, e.g., "10:00 AM")
      required: true, // This field is mandatory
    },
    category: {
      type: String, // String type for event category
      enum: ["Conference", "Workshop", "Meetup", "Webinar", "Other"], // Allowed values for event categories
      default: "Other", // Default value if no category is provided
    },
    attendees: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId, // Reference to a User model document
          ref: "User", // Mongoose will use the User collection
        },
        joinedAt: {
          type: Date, // Date type for when the attendee joined the event
          default: Date.now, // Automatically set to the current date/time
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User who created the event
      ref: "User", // Links to the User collection
      required: true, // This field is mandatory
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps
  }
);

// Create and export the Event model
const Event = mongoose.model("Event", eventSchema);

export default Event;
