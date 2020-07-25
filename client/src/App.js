import React, { Component } from 'react';
import PrivateRoute from './PrivateRoute';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import GiftCards from './GiftCards';
import GiftCardDetails from './GiftCardDetails';
import Stores from './Stores';
import StoreDetails from './StoreDetails';
import AddGiftCard from './AddGiftCard';
import UserProfile from './UserProfile';
import Register from './Register';
import Login from './Login';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isLoggedIn: localStorage.getItem('token')
    }

    this.logInHandler = this.logInHandler.bind(this);
    this.logOutHandler = this.logOutHandler.bind(this);
  }
 
  logInHandler() {
    if (localStorage.getItem('token')) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  logOutHandler() {
    if (!localStorage.getItem('token')) {
      this.setState({
        isLoggedIn: false
      });
    }
  }

  render() {

    let authenticated;
    if (localStorage.getItem('token')) {
        authenticated = true;
    }

    return (
      <div className="App">
        <Router>
          <Navbar isLoggedIn={this.state.isLoggedIn} logOutHandler={this.logOutHandler} />
          <div className="container">

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/gift-cards" component={GiftCards} />
              <Route path="/cards/:id" component={GiftCardDetails} />
              <Route path="/stores" component={Stores} />
              <Route path="/store/:id" component={StoreDetails} />
              <Route path="/login" render={(props) => (<Login {...props} logInHandler={this.logInHandler}/>)} />
              <Route path="/register" component={Register} />
              <PrivateRoute isAuthenticated={authenticated} path="/user" component={UserProfile} />
              <PrivateRoute isAuthenticated={authenticated} path="/add-card" component={AddGiftCard} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
