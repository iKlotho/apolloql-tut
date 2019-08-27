import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Chat from './Chat';

import './index.css';
import App from './App';


const gql_serv = 'http://localhost:8000/graphql'

const httpLink = new HttpLink({
    uri: gql_serv,
});

const cache = new InMemoryCache();
const client = new ApolloClient({
    link: httpLink,
    cache,
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Chat />
    </ApolloProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
