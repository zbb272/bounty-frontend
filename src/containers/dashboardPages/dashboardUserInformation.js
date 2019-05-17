import React, { Component } from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import DashboardUserInfoTop from '../../components/dashboardComponents/dashboardUserInfoTop'
import DashboardUserInfoStats from '../../components/dashboardComponents/dashboardUserInfoStats'

const userInfoStyle = {
  marginLeft: 10,
}

class DashboardUserInformation extends Component {
  render(){
    return(
      <div className='user-information' style={userInfoStyle}>
      <Segment>
        <Segment>
          <Icon name="user" size="massive" />
        </Segment>
        <DashboardUserInfoTop />
        <DashboardUserInfoStats />
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

export default withRouter(connect(mapStateToProps)(DashboardUserInformation));
