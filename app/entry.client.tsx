import { ApolloProvider } from '@apollo/client'
import { RemixBrowser } from 'remix'
import { hydrate } from 'react-dom'
import { initApollo } from './context/apollo'

function Client() {
  const client = initApollo(false)

  return (
    <ApolloProvider client={client}>
      <RemixBrowser />
    </ApolloProvider>
  )
}

hydrate(<Client />, document)
