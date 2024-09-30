import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Add your user schema fields here
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // ... other fields
});

const User = mongoose.model("User", userSchema); // Use 'User' instead of 'itemSchema'

export default User; // Export the User model
