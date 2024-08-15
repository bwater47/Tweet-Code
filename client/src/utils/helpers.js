// Desc: Apollo Client instance with custom links for error handling, authentication, and file uploads.
import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";


// Error handling link.
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const uri =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3001/graphql'
    : `/graphql`;


// Custom upload link.
const uploadLink = createUploadLink({
  uri: uri,
});

// Authentication link.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "Apollo-Require-Preflight": "true",
    },
  };
});

// Apollo Client instance.
const client = new ApolloClient({
  uri: uri,
  link: from([errorLink, authLink, uploadLink]),
  cache: new InMemoryCache(),
  
});
export default client;
