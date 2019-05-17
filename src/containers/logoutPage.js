import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import { logoutUser, unAuthenticateUser } from '../redux/actionCreators'

const loginFormStyle = {
  height: "100%",
  marginTop: "25%",
}

class logoutPage extends Component {

  componentDidMount(){
    this.props.logoutUser();
    this.props.unAuthenticateUser();
    this.props.history.push("/login")
  }

  render(){
    return(
      <div>
      { this.props.userAuthenticated || this.props.currentUser ?
        <div><Icon loading size='big' name='circle notch' /></div>
      :
        <div><Redirect to={{ pathname: "/login" }}/></div>}
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  userAuthenticated: store.userAuthenticated,
  currentUser: store.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  logoutUser: ()=>{dispatch( logoutUser() )},
  unAuthenticateUser: ()=>{dispatch( unAuthenticateUser() )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(logoutPage));
