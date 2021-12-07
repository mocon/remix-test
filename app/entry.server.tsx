import { renderToString } from 'react-dom/server'
import { RemixServer } from 'remix'
import { ApolloProvider } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import ApolloContext, { initApollo } from './context/apollo'
import { FirebaseAuthProvider } from './context/firebase.server'
import type { EntryContext } from 'remix'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const client = initApollo()

  const App = (
    <FirebaseAuthProvider>
      <ApolloProvider client={client}>
        <RemixServer context={remixContext} url={request.url} />
      </ApolloProvider>
    </FirebaseAuthProvider>
  )

  return getDataFromTree(App).then(() => {
    const initialState = client.extract()

    const markup = renderToString(
      <ApolloContext.Provider value={initialState}>{App}</ApolloContext.Provider>,
    )

    responseHeaders.set('Content-Type', 'text/html')

    return new Response('<!DOCTYPE html>' + markup, {
      status: responseStatusCode,
      headers: responseHeaders,
    })
  })
}
