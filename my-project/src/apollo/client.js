// apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@vue/apollo-option';

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const apolloProvider = new ApolloProvider({
  defaultClient: apolloClient,
});

export default apolloProvider;

