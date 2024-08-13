import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Problem from "../models/Problem.js";

const commentAndSolutionData = [
  // Regular comments.
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
  {
    content: "This solution is not optimal for large inputs.",
    isSolution: false,
    votes: [{ value: -1 }, { value: -1 }],
  },
  {
    content: "I like how you handled edge cases.",
    isSolution: false,
    votes: [{ value: 1 }, { value: 1 }],
  },
  {
    content: "Can you provide more test cases?",
    isSolution: false,
    votes: [{ value: 1 }],
  },
  {
    content: "This approach is language-agnostic, nice!",
    isSolution: false,
    votes: [{ value: 1 }, { value: 1 }, { value: 1 }],
  },
  {
    content: "Have you considered using a different data structure?",
    isSolution: false,
    votes: [{ value: 1 }, { value: -1 }],
  },
  {
    content: "The code is well-commented and easy to understand.",
    isSolution: false,
    votes: [{ value: 1 }, { value: 1 }],
  },
  {
    content: "This solution might have issues with concurrency.",
    isSolution: false,
    votes: [{ value: -1 }],
  },
  {
    content: "Excellent use of dynamic programming!",
    isSolution: false,
    votes: [{ value: 1 }, { value: 1 }, { value: 1 }],
  },
  {
    content: "How does this perform with very large datasets?",
    isSolution: false,
    votes: [{ value: 1 }],
  },
  {
    content: "I found a small bug in the implementation.",
    isSolution: false,
    votes: [{ value: 1 }, { value: -1 }],
  },
  {
    content: "This approach is very memory-efficient.",
    isSolution: false,
    votes: [{ value: 1 }, { value: 1 }],
  },
  {
    content: "Have you benchmarked this against other solutions?",
    isSolution: false,
    votes: [{ value: 1 }],
  },
  // Solutions (previously in solutionSeeds.js).
  {
    content: "Here's a recursive implementation of the Fibonacci sequence:",
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    isSolution: true,
    language: "javascript",
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
  {
    content: "Here's an implementation of quicksort in C#:",
    code: `public class QuickSort {
    public static void Sort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = Partition(arr, low, high);
            Sort(arr, low, pi - 1);
            Sort(arr, pi + 1, high);
        }
    }

    private static int Partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}`,
    isSolution: true,
    language: "csharp",
    votes: [{ value: 1 }, { value: 1 }, { value: 1 }],
  },
  {
    content: "Here's an implementation of merge sort in JavaScript:",
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
    isSolution: true,
    language: "javascript",
    votes: [{ value: 1 }, { value: 1 }, { value: -1 }],
  },
  {
    content: "Here's a solution for the Two Sum problem in Python:",
    code: `def two_sum(nums, target):
    num_dict = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_dict:
            return [num_dict[complement], i]
        num_dict[num] = i
    return []`,
    isSolution: true,
    language: "python",
    votes: [{ value: 1 }, { value: 1 }],
  },
  {
    content: "Here's an implementation of a Trie (Prefix Tree) in Java:",
    code: `class TrieNode {
    private TrieNode[] children;
    private boolean isEndOfWord;

    public TrieNode() {
        children = new TrieNode[26];
        isEndOfWord = false;
    }
}

public class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode current = root;
        for (char ch : word.toCharArray()) {
            int index = ch - 'a';
            if (current.children[index] == null) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        current.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode node = searchPrefix(word);
        return node != null && node.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null;
    }

    private TrieNode searchPrefix(String word) {
        TrieNode current = root;
        for (char ch : word.toCharArray()) {
            int index = ch - 'a';
            if (current.children[index] == null) {
                return null;
            }
            current = current.children[index];
        }
        return current;
    }
}`,
    isSolution: true,
    language: "java",
    votes: [{ value: 1 }, { value: 1 }, { value: 1 }],
  },
  {
    content: "Here's a solution for the Maximum Subarray problem in C#:",
    code: `public class Solution {
    public int MaxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.Length; i++) {
            currentSum = Math.Max(nums[i], currentSum + nums[i]);
            maxSum = Math.Max(maxSum, currentSum);
        }
        
        return maxSum;
    }
}`,
    isSolution: true,
    language: "csharp",
    votes: [{ value: 1 }, { value: 1 }],
  },
  {
    content: "Here's an implementation of Dijkstra's algorithm in JavaScript:",
    code: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const queue = new PriorityQueue();

  for (let vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;
  queue.enqueue(start, 0);

  while (!queue.isEmpty()) {
    const current = queue.dequeue().element;
    visited.add(current);

    for (let neighbor in graph[current]) {
      if (!visited.has(neighbor)) {
        const distance = distances[current] + graph[current][neighbor];
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          queue.enqueue(neighbor, distance);
        }
      }
    }
  }

  return distances;
}

class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}`,
    isSolution: true,
    language: "javascript",
    votes: [{ value: 1 }, { value: 1 }, { value: 1 }],
  },
  {
    content:
      "Here's a solution for the Longest Palindromic Substring problem in Python:",
    code: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s:
            return ""
        
        start = 0
        max_length = 1
        
        for i in range(len(s)):
            # Check for odd-length palindromes
            left, right = i, i
            while left >= 0 and right < len(s) and s[left] == s[right]:
                if right - left + 1 > max_length:
                    start = left
                    max_length = right - left + 1
                left -= 1
                right += 1
            
            # Check for even-length palindromes
            left, right = i, i + 1
            while left >= 0 and right < len(s) and s[left] == s[right]:
                if right - left + 1 > max_length:
                    start = left
                    max_length = right - left + 1
                left -= 1;
                right += 1;
        
        return s[start:start + max_length]`,
    isSolution: true,
    language: "python",
    votes: [{ value: 1 }, { value: 1 }],
  },
];

// Create an async function to seed the comments and solutions.
const seedCommentsAndSolutions = async () => {
  try {
    // Clear existing comments.
    await Comment.deleteMany({});
    console.log("Existing comments and solutions deleted");

    // Get all users and problems.
    const users = await User.find();
    const problems = await Problem.find();

    // Check if users and problems exist.
    if (users.length === 0 || problems.length === 0) {
      throw new Error(
        "Users or Problems not found. Please seed users and problems first."
      );
    }

    // Create comments and solutions.
    const createdItems = await Promise.all(
      commentAndSolutionData.map(async (item) => {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomProblem =
          problems[Math.floor(Math.random() * problems.length)];

        // Create a new comment or solution.
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

    // Add comments and solutions to their respective problems.
    await Promise.all(
      createdItems.map(async (item) => {
        await Problem.findByIdAndUpdate(item.problem, {
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
