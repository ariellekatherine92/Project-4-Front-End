// Imports
import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
// CSS
import './App.css';
// Components
import Navbar from './components/Navbar';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Profile from './components/pages/Profile';
import Blog from './components/pages/Blog';

// Private route component
const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log('This is a private route...')
    let user = localStorage.getItem('jwtToken');

    return <Route {...rest} render={ (props) => {
        return user ? <Component {...rest} {...props} /> : <Redirect to='/login' />
    }}/>
}


function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;
    // if there is no token inside localStorage, then the user is not authenticated
    if (!localStorage.getItem('jwtToken')) {
        console.log('is not authenticated...');
        setIsAuthenticated(false);
    } else {
        token = jwt_decode(localStorage.getItem('jwtToken'));
        console.log('token', token);
        setAuthToken(token); // come back to this. 
        setCurrentUser(token);
    }
  }, []);

  const nowCurrentUser = userData => {
      console.log('--- inside nowCurrentUser ---');
      setCurrentUser(userData);
      setIsAuthenticated(true); 
  }

  const handleLogout = () => {
      if (localStorage.getItem('jwtToken')) {
          localStorage.removeItem('jwtToken'); // if there is a token, then remove it
          setCurrentUser(null); // set the currentUser to null
          setIsAuthenticated(false) // set is auth to false
      }
  }
  return (
    <>
      <Router>
        <Navbar user={currentUser} />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={SignUp} />
          <Route 
            path='/login' 
            render={(props) => (
              <Login {...props} user={currentUser} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} />
            )}
          />
          <Route 
            path='/logout' 
            render={(props) => (
              <Logout {...props} user={currentUser} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} />
            )}
          />
          <Route path="/profile" render={props => (<Profile {...props} user={currentUser} />)} />
          <Route path="/blog" render={props => (<Blog {...props} user={currentUser} />)} />
        </Switch>
      </Router>
    </>
  );
}

export default App;