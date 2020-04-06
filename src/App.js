import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Job from "./Components/Jobs";
import Header from './Components/header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JobDetails from "./Components/jobdetails";
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
            <Route path="/jobs/:job_slug/:company_slug">
              <JobDetails />
            </Route>
            <Route path="/">
              <Job />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}





export default App;
