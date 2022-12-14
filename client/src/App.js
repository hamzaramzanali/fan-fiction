import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Apollo Provider to make every request work with the Apollo Server
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage'
import SearchAllCharacters from './pages/SearchAllCharacters';
import SearchPage from './pages/SearchPage';
import CommunityPage from './pages/CommunityPage';
import SingleAdventure from './pages/SingleAdventure';
import Footer from './components/Footer';

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
          <Navbar className="p-5"/>
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
              path='/community'
              element={<CommunityPage />} 
            />
            <Route 
                path="/adventure/:adventureId" 
                element={<SingleAdventure />}
              />
            <Route
              path='/search'
              element={<SearchAllCharacters />}
            />
            <Route
              path='/searchSpecific'
              element={<SearchPage />}
            />
          </Routes>
          <Footer></Footer>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;









