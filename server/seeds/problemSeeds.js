// Import the Problem model from models/Problem.
import Problem from "../models/Problem.js";
// Import the User model from models/User.
import User from "../models/User.js";
// Create an array of problem data.
const problemData = [
  {
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    code: "function twoSum(nums, target) {\n  // Your code here\n}",
    programmingLanguage: "JavaScript", // Changed from 'language' to 'programmingLanguage'.
    tags: ["Array", "Hash Table"],
    coinReward: 50,
  },
  {
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters s.",
    code: "def reverseString(s):\n    # Your code here",
    programmingLanguage: "Python", // Changed from 'language' to 'programmingLanguage'.
    tags: ["String", "Two Pointers"],
    coinReward: 30,
  },
  {
    title: "Fibonacci Number",
    description: "Calculate the nth Fibonacci number.",
    code: "public class Solution {\n    public int fib(int n) {\n        // Your code here\n    }\n}",
    programmingLanguage: "Java", // Changed from 'language' to 'programmingLanguage'.
    tags: ["Math", "Dynamic Programming"],
    coinReward: 40,
  },
];
// Create an async function to seed the problems.
const seedProblems = async () => {
  try {
    // Get all users from the database.
    const users = await User.find();

    if (users.length === 0) {
      throw new Error("Users not found. Please seed users first.");
    }

    // Create problems for each user.
    const createdProblems = await Promise.all(
      problemData.map(async (problem) => {
        const randomUser = users[Math.floor(Math.random() * users.length)];

        const newProblem = new Problem({
          ...problem,
          author: randomUser._id,
          createdAt: new Date(),
        });

        randomUser.problems = [...randomUser.problems, newProblem];

        await newProblem.save();
        return newProblem;
      })
    );

    console.log(`${createdProblems.length} problems seeded successfully`);
  } catch (err) {
    console.error("Error seeding problems:", err);
    throw err; // Re-throw the error so it's caught in the main seed function.
  }
};
// Export the seedProblems function.
export default seedProblems;
