import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from "react-redux"

const imageStyle = {
  maxWidth: 75,
  marginLeft: "auto",
  marginRight: "auto",
}

const statsStyle = {
  marginTop: 30,
}

class DashboardUserInfoStats extends Component {
  render(){
    return(
      <div style={statsStyle}>
        <Segment>
          <h2>Stats</h2>
          <p>stars here</p>
          <p>Number of Bounties Posted: {(this.props.currentUser.bounties).length}</p>
          <p>Bounties Completed: {(this.props.currentUser.bounties).length}</p>
          <p>Number of Projects: {(this.props.currentUser.projects).length}</p>
          <p>Projects Completed: {(this.props.currentUser.projects).filter(proj => proj.progress === 100).length}</p>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

export default connect(mapStateToProps)(DashboardUserInfoStats);
