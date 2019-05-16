import React, { Component } from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import UserInfoTop from '../components/userInfoComponents/userInfoTop'
import UserInfoStats from '../components/userInfoComponents/userInfoStats'

const userInfoStyle = {
  marginLeft: 10,
}

class UserInformation extends Component {
  render(){
    return(
      <div className='user-information' style={userInfoStyle}>
      <Segment>
        <Segment>
          <Icon name="user" size="massive" />
        </Segment>
        <UserInfoTop />
        <UserInfoStats />
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

export default withRouter(connect(mapStateToProps)(UserInformation));
