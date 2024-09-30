// In your db.js file

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://bakery-easy:tW64NXurBOELdN16@cluster0.t8k51.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB; // Add this line to export the function
