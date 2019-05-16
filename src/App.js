import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import logo from './logo.svg';
import SignUpPage from './containers/signUpPage';
import LoginPage from './containers/loginPage';
import ProfileDashboardPage from './containers/profileDashboardPage'
import EditProfileDashboardPage from './containers/editProfileDashboardPage'
import './App.css';
import { fetchedUser, authenticatedUser } from './redux/actionCreators'

// whiteish grey:  "#E1EDFF"
// light blue:     "#8DA2C0"
// main color:     "#2C4870"
// dark blue:      "#031229"
// black:          "#000000"

class App extends Component {
  componentDidMount(){
    // this.removeUserFromLocalStorage()
    this.checkLocalStorageForUser()
  }

  checkLocalStorageForUser = () => {
    if(localStorage.hasOwnProperty("currentUser")){
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);
      this.props.fetchedUser(user)
      this.props.authenticatedUser()
    }
  }

  removeUserFromLocalStorage = () => {
    if(localStorage.hasOwnProperty("currentUser")){
      localStorage.removeItem("currentUser");
    }
  }

  render(){
    console.log("Component: ", this.props.currentUser)
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/dashboard" component={ProfileDashboardPage} />
          <Route exact path="/edit" component={EditProfileDashboardPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  fetchedUser: (user)=>{dispatch( fetchedUser(user) )},
  authenticatedUser: (user)=>{dispatch( authenticatedUser(user) )}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
