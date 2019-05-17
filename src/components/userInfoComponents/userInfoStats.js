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

class UserInfoStats extends Component {
  render(){
    return(
      <div style={statsStyle}>
        <Segment>
          <h2>Stats</h2>
          <p>stars here</p>
          <p>Number of Bounties Posted: {(this.props.targetUser.bounties).length}</p>
          <p>Bounties Completed: {(this.props.targetUser.bounties).length}</p>
          <p>Number of Projects: {(this.props.targetUser.projects).length}</p>
          <p>Projects Completed: {(this.props.targetUser.projects).filter(proj => proj.progress === 100).length}</p>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  targetUser: store.targetUser,
})

export default connect(mapStateToProps)(UserInfoStats);
