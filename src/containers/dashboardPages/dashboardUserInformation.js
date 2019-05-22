import React, { Component } from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import DashboardUserInfoTop from '../../components/dashboardComponents/dashboardUserInfoTop'
import DashboardUserInfoStats from '../../components/dashboardComponents/dashboardUserInfoStats'
import { backgroundColor2 } from '../../style/theme'

const userInfoStyle = {
  marginLeft: 10,
}

class DashboardUserInformation extends Component {
  render(){
    return(
      <div className='user-information' style={userInfoStyle}>
      <Segment style={backgroundColor2}>
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
