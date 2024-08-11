import { gql } from "@apollo/client";
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CREATE_CHECKOUT_SESSION = gql`
  mutation createCheckoutSession($amount: Float!) {
    createCheckoutSession(amount: $amount) {
      sessionId
    }
  }
`;

export const MAKE_DONATIONTRANSACTION = gql`
  mutation makeDonationTransaction($donationId: ID!) {
    makeDonationTransaction(donationId: $donationId) {
      _id
      purchaseDate
      donations {
        _id
        name
        description
        price
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const CREATE_PROBLEM = gql`
  mutation CreateProblem(
    $title: String!
    $description: String!
    $programmingLanguage: String!
    $code: String!
    $tags: [String]
    $coinReward: Int
  ) {
    createProblem(
      title: $title
      description: $description
      programmingLanguage: $programmingLanguage
      code: $code
      tags: $tags
      coinReward: $coinReward
    ) {
      _id
      title
      description
      programmingLanguage
      code
      tags
      coinReward
      createdAt
      author {
        username
      }
    }
  }
`;

export const UPDATE_PROBLEM = gql`
  mutation UpdateProblem(
    $id: ID!
    $title: String
    $description: String
    $programmingLanguage: String
    $code: String
    $tags: [String]
    $coinReward: Int
  ) {
    updateProblem(
      id: $id
      title: $title
      description: $description
      programmingLanguage: $programmingLanguage
      code: $code
      tags: $tags
      coinReward: $coinReward
    ) {
      _id
      title
      description
      programmingLanguage
      code
      tags
      coinReward
      createdAt
      author {
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $username: String
    $firstName: String
    $lastName: String
    $avatar: Upload
  ) {
    updateUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
    ) {
      _id
      username
      firstName
      lastName
      email
      avatar
    }
  }
`;


export const DELETE_PROBLEM = gql`
  mutation DeleteProblem($id: ID!) {
    deleteProblem(id: $id)
  }
`;
export const ADD_MEDAL_TO_USER = gql`
mutation Mutation($userId: ID!, $medalId: ID!) {
  addMedalToUser(userId: $userId, medalId: $medalId) {
    _id
    medals {
      _id
      title
      description
      price
    }
  }
}
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`;
export const UPDATE_COINS = gql`
mutation UpdateCoins($userId: ID!, $amount: Int!) {
    updateCoins(userId: $userId, amount: $amount) {
    coins
    }
}
`;
