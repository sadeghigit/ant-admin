"use client"

import axios from 'axios';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink }
  from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCookie, setCookie } from 'cookies-next';

async function refreshToken() {
  const refreshToken = getCookie('refreshToken');
  if (!refreshToken) return undefined

  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND + '/graphql', {
    query: `mutation { 
      refreshToken(token:"${refreshToken}"){ accessToken expiresIn }
     }`,
  })

  const { accessToken, expiresIn } = data.data.data.refreshToken
  setCookie("accessToken", accessToken, { maxAge: expiresIn });
  return accessToken
}

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND + '/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  let accessToken = getCookie('accessToken');
  if (!accessToken) accessToken = await refreshToken()
  if (!accessToken) return { headers }
  const authorization = `Bearer ${accessToken}`
  return { headers: { ...headers, authorization } }
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
