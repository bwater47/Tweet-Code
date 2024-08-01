const typeDefs = `
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    coins: Int
    solutions: [Solution]
    problems: [Problem]
    donationsMade: [DonationTransaction]
    donationsReceived: [DonationTransaction]
  }

  type Post {
    _id: ID
    title: String
    content: String
    author: User
    createdAt: String
    updatedAt: String
    comments: [Comment]
    votes: [Vote]
    tags: [String]
  }

  type Problem {
    _id: ID
    title: String!
    description: String!
    code: String
    language: String!
    author: User!
    createdAt: String
    solutions: [Solution]
    tags: [String]
    coinReward: Int
  }

  type Solution {
    _id: ID
    problemId: ID!
    code: String!
    explanation: String
    author: User!
    createdAt: String
    votes: Int
    comments: [Comment]
    coinReward: Int
  }

  type Comment {
    _id: ID
    content: String!
    author: User!
    post: Post
    createdAt: String
    updatedAt: String
    votes: [Vote]
    replies: [Comment]
  }

  type Coin {
    _id: ID
    amount: Int!
    recipient: User!
    sender: User
    reason: String
    createdAt: String
  }

  type Donation {
    _id: ID
    name: String
    description: String
    price: Float
  }

  type DonationTransaction {
    _id: ID
    purchaseDate: String
    donations: [Donation]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user: [User]
    user(username: String!): User
    problems: [Problem]
    problem(_id: ID!): Problem
    solutions(problemId: ID!): [Solution]
    userCoinHistory(userId: ID!): [Coin]
    donations: [Donation]
    donation(_id: ID!): Donation
    donationTransactions(userId: ID!): [DonationTransaction]
    posts(limit: Int, offset: Int): [Post]
    post(_id: ID!): Post
    comments(postId: ID!): [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation {
    # User Authentication and Management
    # These mutations handle user registration, login, and profile updates
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(username: String, firstName: String, lastName: String, email: String, password: String): User
    
    # Problem Management
    # These mutations allow creation, updating, and deletion of coding problems
    addProblem(title: String!, description: String!, code: String, language: String!, tags: [String], coinReward: Int): Problem
    updateProblem(_id: ID!, title: String, description: String, code: String, language: String, tags: [String], coinReward: Int): Problem
    deleteProblem(_id: ID!): Problem
    
    # Solution Management
    # These mutations handle the creation, updating, and deletion of solutions to problems
    addSolution(problemId: ID!, code: String!, explanation: String): Solution
    updateSolution(_id: ID!, code: String, explanation: String): Solution
    deleteSolution(_id: ID!): Solution
    
    # Solution Voting
    # This mutation allows users to vote on solutions
    voteSolution(solutionId: ID!, voteType: String!): Solution
    
    # Comment Management for Solutions
    # These mutations handle adding, updating, and deleting comments on solutions
    addComment(solutionId: ID!, content: String!): Comment
    updateComment(_id: ID!, content: String!): Comment
    deleteComment(_id: ID!): Comment
    
    # Coin Management
    # These mutations handle awarding, transferring, and redeeming coins
    awardCoins(recipientId: ID!, amount: Int!, reason: String): Coin
    transferCoins(recipientId: ID!, amount: Int!): Coin
    redeemCoins(amount: Int!): User
    
    # Donation Management
    # These mutations allow creation, updating, and deletion of donation options
    createDonation(name: String!, description: String, suggestedAmount: Float, minimumAmount: Float, donationType: String!, recurring: Boolean, frequency: String): Donation
    updateDonation(_id: ID!, name: String, description: String, suggestedAmount: Float, minimumAmount: Float, donationType: String, recurring: Boolean, frequency: String): Donation
    deleteDonation(_id: ID!): Donation
    
    # Donation Transaction
    # This mutation handles making a donation
    makeDonation(donationId: ID!, amount: Float!, donorId: ID!, recipientId: ID): DonationTransaction

    # Post Management
    # These mutations allow creation, updating, and deletion of posts
    createPost(title: String!, content: String!, tags: [String]): Post
    updatePost(_id: ID!, title: String, content: String, tags: [String]): Post
    deletePost(_id: ID!): Post
    
    # Comment Management for Posts
    # These mutations handle adding comments to posts and replying to existing comments
    addCommentToPost(postId: ID!, content: String!): Comment
    addReplyToComment(commentId: ID!, content: String!): Comment
    
    # Voting System for Posts and Comments
    # These mutations allow users to vote on posts and comments
    votePost(postId: ID!, value: Int!): Post
    voteComment(commentId: ID!, value: Int!): Comment
  }
`;

export default typeDefs;