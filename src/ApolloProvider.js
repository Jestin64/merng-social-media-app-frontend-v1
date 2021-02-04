import React from "react"
import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context"

import App from "./App"


const httplink = createHttpLink({
    uri: 'http://localhost:3000'        // pass the gql endpoint api
})


const authLink = setContext(() => {
    const token = localStorage.getItem('jwt-token')
    return ({      
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    })
})

const client = new ApolloClient({
    link: authLink.concat(httplink),
    cache: new InMemoryCache()
})


export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
