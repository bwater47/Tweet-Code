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
export const ADD_DONATIONTRANSACTION = gql`
  mutation addDonationTransaction($donations: [ID]!) {
    addDonationTransaction(donations: $donations) {
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
