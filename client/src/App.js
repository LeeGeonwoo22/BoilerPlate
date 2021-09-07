
import React from 'react';

import {
  BrowserRouter as Router, Route , Switch, Link
} from 'react-router-dom'

import LandingPage from "./components/views/Landing page/LandingPage";
import LoginPage from "./components/views/Login page/LoginPage";
import Nav from "./components/views/Navbar/Nav";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}>
            <LandingPage />
          </Route>
          <Route path = "/Login" component={LoginPage}>
            <LoginPage />
          </Route>
          <Route path ="/Register" component={RegisterPage}>
            <RegisterPage />
          </Route>
          <Route path ="/Nav" component={Nav}>
            <Nav />
          </Route>
        </Switch>
      </div>
    </Router>
      
    
  );
}

export default App;
