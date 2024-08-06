import { gql } from "@apollo/client";
export const QUERY_DONATIONS = gql`
  query getDonations {
    donations {
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

export const QUERY_DASHBOARD_USER = gql`
  query GetDashboardUser {
    me {
      _id
      username
      email
      firstName
      lastName
    }
  }
`;