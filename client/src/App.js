import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apoloo/react-hooks';
import Client from 'apollo-boost';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';


const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })
  },

  uri: "/graphql",
});

function App(){
  return(
    <ApolloProvider client ={client}>
      <Router>
        <>
        <Navbar />
        <Switch>
          <Route exact path= '/' component= {SearchBooks} />
          <Route exact path= '/saved' component ={SavedBooks} />
        </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
