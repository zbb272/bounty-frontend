import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"
import BountyCardSmall from "../bountyCardComponents/bountyCardSmall"
import UserCardSmall from "../userCardComponents/userCardSmall"
import { backgroundColor2 } from '../../style/theme'

const imageStyle = {
  maxWidth: 75,
  marginLeft: "auto",
  marginRight: "auto",
}

const headerStyle = {
  color: "#E1EDFF",
  marginBottom: "10px",
}

class ProjectContributors extends Component{

  render(){
    return(
      <div>
      <Segment style={backgroundColor2}>
        {this.props.bounties.map(bount => <UserCardSmall key={bount.id} bounty={bount} project={this.props.currentProject}/> )}
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentProject: store.currentProject,
})

export default withRouter(connect(mapStateToProps)(ProjectContributors));
