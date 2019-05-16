import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from '../components/navBar';

const loginFormStyle = {
  height: "100%",
  marginTop: "25%",
}

class ProfileDashboardPage extends Component {
  render(){
    return(
      <div>
        { !this.props.userAuthenticated ?
        <Redirect to={{
          pathname: "/login"
        }}/>
        :
        <div className='dashboard-page' style={loginFormStyle}>
          <NavBar />
          <h1>Dashboard page</h1>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
  userAuthenticated: store.userAuthenticated
})

export default withRouter(connect(mapStateToProps)(ProfileDashboardPage));
