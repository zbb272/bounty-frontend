import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import SignUpPage from './containers/signUpPage';
import LoginPage from './containers/loginPage';
import logoutPage from './containers/logoutPage';
import DashboardPage from './containers/dashboardPages/dashboardPage'
import ProfileDashboardPage from './containers/profileDashboardPage'
import EditProfileDashboardPage from './containers/editProfileDashboardPage'
import ProjectPage from './containers/projectPages/projectPage'
import ProjectPageBounties from './containers/projectPages/projectPageBounties'
import ProjectPageContributors from './containers/projectPages/projectPageContributors'
import ProjectPageEdit from './containers/projectPages/projectPageEdit'
import BountyPage from './containers/bountyPages/bountyPage'
import NewBountyPage from './containers/bountyPages/newBountyPage'
import NewProjectPage from './containers/projectPages/newProjectPage'
import ProjectsBrowsePage from './containers/projectPages/projectsBrowsePage'
import BountiesBrowsePage from './containers/bountyPages/bountiesBrowsePage'
import SearchResultsPage from './containers/searchResultsPage/searchResultsPage'
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
    return (
      <div className="App">
          { !this.props.userAuthenticated ?
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route component={LoginPage}/>
            </Switch>
          :
            <Switch>
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route exact path="/logout" component={logoutPage} />
              <Route exact path="/bounties" component={BountiesBrowsePage} />
              <Route exact path="/projects" component={ProjectsBrowsePage} />
              <Route exact path="/projects/new" component={NewProjectPage} />
              <Route path="/search/:searchTerm" component={SearchResultsPage} />
              <Route path="/users/:id/edit" component={EditProfileDashboardPage} />
              <Route path="/users/:id" component={ProfileDashboardPage} />
              <Route path="/projects/:id/bounties/new" component={NewBountyPage} />
              <Route path="/projects/:id/bounties/:bountyId" component={BountyPage} />
              <Route path="/projects/:id/bounties" component={ProjectPageBounties} />
              <Route path="/projects/:id/contributors" component={ProjectPageContributors} />
              <Route path="/projects/:id/edit" component={ProjectPageEdit} />
              <Route path="/projects/:id" component={ProjectPage} />
              <Route component={DashboardPage}/>
            </Switch>
          }

      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
  userAuthenticated: store.userAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
  fetchedUser: (user)=>{dispatch( fetchedUser(user) )},
  authenticatedUser: (user)=>{dispatch( authenticatedUser(user) )}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
