import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Apollo Provider to make every request work with the Apollo Server
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
// import Header from './components/Header';
import ProfilePage from './pages/ProfilePage'
import SearchAllCharacters from './pages/SearchAllCharacters';
import SearchPage from './pages/SearchPage';
import SavedCharacters from './pages/SavedCharactersPage';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
      {/* <Header /> */}

          <Routes>
            <Route
              path='/'
              element={<HomePage />}
            />
            <Route
              path='/profile'
              element={<ProfilePage />}
            />
            <Route
              path='/search'
              element={<SearchAllCharacters />} 
            />
            <Route
              path='/searchSpecific'
              element={<SearchPage />} 
            />
            <Route
              path='/savedCharacters'
              element={<SavedCharacters />} 
            />
            
            {/* <Route
              path='/saved'
              element={<SavedBooks />}
            />
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            /> */}
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;









