import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { createConsumer } from '@rails/actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'
import { Auth } from '@groovestack/auth'

// # VITE ENV
const uri = '/graphql'

const getWSURL = () => {
  return '/cable'
}

export const cable = createConsumer(getWSURL())

const hasSubscriptionOperation = (params) => {
  const { query: { definitions } } = params
  
  return definitions.some(({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription')
}

const httpLink = new HttpLink({
  uri
});

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({ cable, channelName: 'GraphQLChannel' }),
  httpLink
)

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  link: Auth.ApolloLink.concat(link)
})