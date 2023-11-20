import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import { StoreProvider } from './pages/Store.jsx'

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'

const httpLink = new HttpLink({
  uri: '/graphql'
})
const client = new ApolloClient({
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <StoreProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
      </StoreProvider>
    </Router>
  </React.StrictMode>
)
