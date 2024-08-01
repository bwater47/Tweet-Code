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
    createdAt: String
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
    donationtransaction(_id: ID!): DonationTransaction
    checkout(donations: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(username: String, firstName: String, lastName: String, email: String, password: String): User
    
    addProblem(title: String!, description: String!, code: String, language: String!, tags: [String], coinReward: Int): Problem
    updateProblem(_id: ID!, title: String, description: String, code: String, language: String, tags: [String], coinReward: Int): Problem
    deleteProblem(_id: ID!): Problem
    
    addSolution(problemId: ID!, code: String!, explanation: String): Solution
    updateSolution(_id: ID!, code: String, explanation: String): Solution
    deleteSolution(_id: ID!): Solution
    
    voteSolution(solutionId: ID!, voteType: String!): Solution
    
    addComment(solutionId: ID!, content: String!): Comment
    updateComment(_id: ID!, content: String!): Comment
    deleteComment(_id: ID!): Comment
    
    awardCoins(recipientId: ID!, amount: Int!, reason: String): Coin
    transferCoins(recipientId: ID!, amount: Int!): Coin
    redeemCoins(amount: Int!): User
    
    addDonationTransaction(donations: [ID]!): DonationTransaction
  }
`;

export default typeDefs;
