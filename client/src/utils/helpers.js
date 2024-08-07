import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
// import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.error(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );
//   }

//   if (networkError) {
//     console.error(`[Network error]: ${networkError}`);
//   }
// });

const httpLink = new HttpLink({
  uri: '/graphql', // Ensure this is the correct URL
  credentials: 'include', // Include credentials (cookies) in requests
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;