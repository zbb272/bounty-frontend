import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import logo from './logo.svg';
import SignUpPage from './containers/signUpPage';
import LoginPage from './containers/loginPage';
import ProfileDashboardPage from './containers/profileDashboardPage'
import './App.css';

// whiteish grey:  "#E1EDFF"
// light blue:     "#8DA2C0"
// main color:     "#2C4870"
// dark blue:      "#031229"
// black:          "#000000"

class App extends Component {
  render(){
    console.log("Component: ", this.props.currentUser)
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/dashboard" component={ProfileDashboardPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser
})

export default withRouter(connect(mapStateToProps)(App));
