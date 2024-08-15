// Description: This file is used to seed the database with dummy data.
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Problem from "../models/Problem.js";
import Comment from "../models/Comment.js";
import Medal from "../models/Medal.js";
import seedUsers from "./userSeeds.js";
import seedProblems from "./problemSeeds.js";
import seedCommentsAndSolutions from "./commentSeeds.js";
import seedMedals from "./medalsSeeds.js";
dotenv.config({path: "../../.env"});
import connectDb from '../config/connection.js'
const seedDatabase = async () => {
  
  try {
    
    await connectDb;

    console.log("Connected to MongoDB successfully");

    await User.deleteMany({});
    await Problem.deleteMany({});
    await Comment.deleteMany({});
    await Medal.deleteMany({});
    console.log("Existing data cleared");

    await seedUsers();
    console.log("Users seeded successfully");

    await seedProblems();
    console.log("Problems seeded successfully");

    await seedCommentsAndSolutions();
    console.log("Comments and solutions seeded successfully");

    await seedMedals();
    console.log("medals seeded successfully");

    // await mongoose.connection.close();
    // console.log("MongoDB connection closed");

    console.log("Database seeded successfully");
    
  } catch (err) {
    console.error("Error seeding database:", err);
    await connectDb.close();
    //process.exit(1);
  }
};
export default seedDatabase;
