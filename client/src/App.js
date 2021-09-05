
import React from 'react';

import {
  BrowserRouter as Router, Route , Switch, Link
} from 'react-router-dom'

import LandingPage from "./components/views/Landing page/LandingPage";
import LoginPage from "./components/views/Login page/LoginPage";
import Nav from "./components/views/Navbar/Nav";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path = "/Login">
            <LoginPage />
          </Route>
          <Route path ="/Register">
            <RegisterPage />
          </Route>
          <Route path ="/Nav">
            <Nav />
          </Route>
        </Switch>
      </div>
    </Router>
      
    
  );
}

export default App;
