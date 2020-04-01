import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Job from "./Components/Jobs";
import Header from './Components/header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './style/base/_settings.css';
import './style/base/base.css';
import './style/component/jobs.css';
const client = new ApolloClient({
  uri: "https://api.graphql.jobs/"
});

function App() {
  return (
    <ApolloProvider client={client}>
       <Router>
        <div className="main_container" >
        <Header/>
          <Switch>
            <Route path="/"   component={Job} exact={true}/>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
