import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Apollo Provider to make every request work with the Apollo Server
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import LoginForm from "./components/Login"
import Home from './pages/HomePage'

import logo from './logo.svg';
import './App.css';


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
      /* <LoginForm>
        
      </LoginForm> */
      /* <Router>
        <>
        
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={<HomePage />}
            />
            {/* <Route
              path='/saved'
              element={<SavedBooks />}
            /> */}
            {/* <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            /> */}
          </Routes> */
        /* </>
      </Router>
    </ApolloProvider>
  );
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
