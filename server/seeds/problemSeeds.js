import Problem from "../models/Problem.js";
import User from "../models/User.js";
const problemData = [
  {
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    code: "function twoSum(nums, target) {\n  // Your code here\n}",
    programmingLanguage: "javascript",
    tags: ["Array", "Hash Table"],
    coinReward: 50,
  },
  {
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters s.",
    code: "def reverseString(s):\n    # Your code here",
    programmingLanguage: "python",
    tags: ["String", "Two Pointers"],
    coinReward: 30,
  },
  {
    title: "Fibonacci Number",
    description: "Calculate the nth Fibonacci number.",
    code: "public class Solution {\n    public int fib(int n) {\n        // Your code here\n    }\n}",
    programmingLanguage: "java",
    tags: ["Math", "Dynamic Programming"],
    coinReward: 40,
  },
  {
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    code: "public bool IsValid(string s) {\n    // Your code here\n}",
    programmingLanguage: "csharp",
    tags: ["String", "Stack"],
    coinReward: 45,
  },
  {
    title: "Merge Two Sorted Lists",
    description:
      "Merge two sorted linked lists and return it as a sorted list.",
    code: "function mergeTwoLists(l1, l2) {\n  // Your code here\n}",
    programmingLanguage: "javascript",
    tags: ["Linked List", "Recursion"],
    coinReward: 55,
  },
  {
    title: "Maximum Subarray",
    description:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    code: "def maxSubArray(nums):\n    # Your code here",
    programmingLanguage: "python",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    coinReward: 60,
  },
  {
    title: "Climbing Stairs",
    description:
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    code: "public class Solution {\n    public int climbStairs(int n) {\n        // Your code here\n    }\n}",
    programmingLanguage: "java",
    tags: ["Math", "Dynamic Programming"],
    coinReward: 35,
  },
  {
    title: "Binary Tree Inorder Traversal",
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    code: "public IList<int> InorderTraversal(TreeNode root) {\n    // Your code here\n}",
    programmingLanguage: "csharp",
    tags: ["Stack", "Tree", "Depth-First Search"],
    coinReward: 50,
  },
  {
    title: "Symmetric Tree",
    description:
      "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
    code: "function isSymmetric(root) {\n  // Your code here\n}",
    programmingLanguage: "javascript",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search"],
    coinReward: 45,
  },
  {
    title: "Maximum Depth of Binary Tree",
    description: "Given the root of a binary tree, return its maximum depth.",
    code: "def maxDepth(root):\n    # Your code here",
    programmingLanguage: "python",
    tags: ["Tree", "Depth-First Search"],
    coinReward: 40,
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description:
      "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    code: "public class Solution {\n    public int maxProfit(int[] prices) {\n        // Your code here\n    }\n}",
    programmingLanguage: "java",
    tags: ["Array", "Dynamic Programming"],
    coinReward: 55,
  },
  {
    title: "Valid Palindrome",
    description:
      "Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.",
    code: "public bool IsPalindrome(string s) {\n    // Your code here\n}",
    programmingLanguage: "csharp",
    tags: ["Two Pointers", "String"],
    coinReward: 35,
  },
  {
    title: "Single Number",
    description:
      "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    code: "function singleNumber(nums) {\n  // Your code here\n}",
    programmingLanguage: "javascript",
    tags: ["Array", "Bit Manipulation"],
    coinReward: 40,
  },
  {
    title: "Linked List Cycle",
    description:
      "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    code: "def hasCycle(head):\n    # Your code here",
    programmingLanguage: "python",
    tags: ["Linked List", "Two Pointers"],
    coinReward: 45,
  },
  {
    title: "Intersection of Two Linked Lists",
    description:
      "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.",
    code: "public class Solution {\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        // Your code here\n    }\n}",
    programmingLanguage: "java",
    tags: ["Linked List", "Two Pointers"],
    coinReward: 60,
  },
  {
    title: "Majority Element",
    description:
      "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times.",
    code: "public int MajorityElement(int[] nums) {\n    // Your code here\n}",
    programmingLanguage: "csharp",
    tags: ["Array", "Divide and Conquer", "Bit Manipulation"],
    coinReward: 40,
  },
  {
    title: "House Robber",
    description:
      "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    code: "function rob(nums) {\n  // Your code here\n}",
    programmingLanguage: "javascript",
    tags: ["Dynamic Programming"],
    coinReward: 65,
  },
  {
    title: "Number of Islands",
    description:
      "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    code: "def numIslands(grid):\n    # Your code here",
    programmingLanguage: "python",
    tags: ["Depth-First Search", "Breadth-First Search", "Union Find"],
    coinReward: 70,
  },
  {
    title: "Reverse Linked List",
    description:
      "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    code: "public class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Your code here\n    }\n}",
    programmingLanguage: "java",
    tags: ["Linked List"],
    coinReward: 45,
  },
  {
    title: "Implement Queue using Stacks",
    description:
      "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, pop, peek, empty).",
    code: "public class MyQueue {\n    // Implement the queue here\n}",
    programmingLanguage: "csharp",
    tags: ["Stack", "Design"],
    coinReward: 55,
  },
];
const seedProblems = async () => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      throw new Error("Users not found. Please seed users first.");
    }
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
    throw err;
  }
};
export default seedProblems;
