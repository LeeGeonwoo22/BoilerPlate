
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
          <Route exact path="/" component={Auth(LandingPage, null)}>
            <LandingPage />
          </Route>
          <Route path = "/Login" component={Auth(LoginPage, false)}>
            <LoginPage />
          </Route>
          <Route path ="/Register" component={Auth(RegisterPage, false)}>
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
