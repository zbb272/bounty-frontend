import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import logo from './logo.svg';
import LoginPage from './containers/loginPage';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
