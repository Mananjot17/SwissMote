import mongoose from "mongoose"; // Import Mongoose for defining the schema and creating the model
import bcrypt from "bcryptjs"; // Import bcryptjs for password hashing and comparison

// Define the User schema with fields and validation rules
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String, // String type for the full name of the user
      required: true, // This field is mandatory
    },
    email: {
      type: String, // String type for the email
      required: true, // This field is mandatory
      unique: true, // Ensures no two users can have the same email
    },
    password: {
      type: String, // String type for the password (hashed)
      required: true, // This field is mandatory
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Method to compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  // `bcrypt.compare` returns true if the entered password matches the hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const User = mongoose.model("User", userSchema); // Mongoose will create a `users` collection in the database

export default User;
