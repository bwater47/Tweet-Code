import { gql } from "@apollo/client";
export const QUERY_DONATION = gql`
  query getDonation($_id: ID!) {
    donation(_id: $_id) {
      _id
      name
      description
      price
    }
  }
`;
export const QUERY_CHECKOUT = gql`
  query getCheckout($donations: [ID]!) {
    checkout(donations: $donations) {
      session
    }
  }
`;
export const QUERY_ALL_DONATIONS = gql`
  query getAllDonations {
    donations {
      _id
      name
      description
      price
    }
  }
`;
export const QUERY_USER = gql`
  query {
    user {
      _id
      username
      email
      coins
      firstName
      lastName
      problems {
        _id
        title
        description
      }
      comments {
        _id
        content
        createdAt
      }
      donationtransactions {
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
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      coins
      firstName
      lastName
      problems {
        _id
        title
        description
      }
      comments {
        _id
        content
        createdAt
      }
      donationTransactions {
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
  }
`;

export const GET_PROBLEMS = gql`
  query GetProblems {
    problems {
      _id
      title
      description
      programmingLanguage
      code
      tags
      coinReward
      author {
        username
      }
    }
  }
`;

export const GET_PROBLEM = gql`
  query GetProblem($id: ID!) {
    problem(id: $id) {
      _id
      title
      description
      programmingLanguage
      code
      tags
      coinReward
      author {
        username
      }
    }
  }
`;
