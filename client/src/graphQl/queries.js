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
  {
    donations {
      _id
      name
      description
      price
    }
  }
`;
export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
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