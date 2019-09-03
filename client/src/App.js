import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import GiftCards from './GiftCards';
import Stores from './Stores';
import StoreDetails from './StoreDetails';
import Register from './Register';
import Login from './Login';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">

            <Switch>
              <Route path="/" exact component={GiftCards} />
              <Route path="/stores" component={Stores} />
              <Route path="/store/:id" component={StoreDetails} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
