"use client"

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { getCookie } from 'cookies-next';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND + '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getCookie('accessToken');
  if (!headers) headers = {}
  headers.authorization = `Bearer ${accessToken}`
  return { headers }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

type Props = { children: React.ReactNode }
export default function Apollo({ children }: Props) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
