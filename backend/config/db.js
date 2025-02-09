import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mananjotsingh17:mananjotsingh17@eventmanagementswissmot.0qcb5.mongodb.net/?retryWrites=true&w=majority&appName=eventManagementSwissmote"
    );
    console.log("MongoDB Connected");
  } catch (err) {
    throw new Error(err);
  }
};

export default connectDB;
