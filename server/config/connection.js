// Boilerplate connection.
// Import the necessary modules.
import mongoose from "mongoose";
import dotenv from "dotenv";
// Configure dotenv.
dotenv.config();
// Create an async function to connect to MongoDB.
const connectDB = async () => {
  // Try to connect to MongoDB.
  try {
    // Await the connection to MongoDB.
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/tweetcodedb",
      // Set the options to avoid warnings.
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
// Export the connectDB function.
export default connectDB;
