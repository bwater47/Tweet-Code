import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Problem from "../models/Problem.js";

const commentAndSolutionData = [
  // Regular comments
  {
    content: "Great solution! Very efficient.",
    isSolution: false,
    votes: [{ value: 1 }, { value: 1 }, { value: -1 }],
  },
  {
    content: "I learned a lot from this approach.",
    isSolution: false,
    votes: [{ value: 1 }, { value: 1 }, { value: 1 }],
  },
  {
    content: "Could you explain the time complexity?",
    isSolution: false,
    votes: [{ value: 1 }],
  },
  // Solutions (previously in solutionSeeds.js)
  {
    content:
      "Here's a recursive implementation of the Fibonacci sequence. This solution uses recursion to calculate Fibonacci numbers:",
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    isSolution: true,
    language: "javaScript",
    votes: [{ value: 1 }, { value: 1 }],
  },
  {
    content: "Here's an implementation of the bubble sort algorithm in Python:",
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    isSolution: true,
    language: "python",
    votes: [{ value: 1 }, { value: -1 }, { value: 1 }],
  },
  {
    content: "Here's an implementation of binary search in Java:",
    code: `public class BinarySearch {
    public static int binarySearch(int[] arr, int x) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == x) return mid;
            if (arr[mid] < x) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
    isSolution: true,
    language: "java",
    votes: [{ value: 1 }, { value: 1 }],
  },
];

const seedCommentsAndSolutions = async () => {
  try {
    // Clear existing comments
    await Comment.deleteMany({});
    console.log("Existing comments and solutions deleted");

    // Get all users and problems
    const users = await User.find();
    const problems = await Problem.find();

    if (users.length === 0 || problems.length === 0) {
      throw new Error(
        "Users or Problems not found. Please seed users and problems first."
      );
    }

    // Create comments and solutions
    const createdItems = await Promise.all(
      commentAndSolutionData.map(async (item) => {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomProblem =
          problems[Math.floor(Math.random() * problems.length)];

        const newItem = new Comment({
          content: item.content,
          author: randomUser._id,
          problem: randomProblem._id,
          code: item.code,
          isSolution: item.isSolution,
          language: item.language,
          votes: item.votes.map((vote) => ({
            user: users[Math.floor(Math.random() * users.length)]._id,
            value: vote.value,
          })),
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await newItem.save();
        return newItem;
      })
    );

    console.log(
      `${createdItems.length} comments and solutions seeded successfully`
    );

    // Add comments and solutions to their respective problems
    await Promise.all(
      createdItems.map(async (item) => {
        await Problem.findByIdAndUpdate(item.problem, {
          $push: { comments: item._id },
        });
      })
    );
    await Promise.all(
      createdItems.map(async (item) => {
        await User.findByIdAndUpdate(item.author, {
          $push: { comments: item._id },
        });
      })
    );

    console.log("Comments and solutions added to problems");
  } catch (err) {
    console.error("Error seeding comments and solutions:", err);
  }
};

export default seedCommentsAndSolutions;
