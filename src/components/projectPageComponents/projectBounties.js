import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"
import BountyCardSmall from "../bountyCardComponents/bountyCardSmall"

const imageStyle = {
  maxWidth: 75,
  marginLeft: "auto",
  marginRight: "auto",
}

const headerStyle = {
  color: "#E1EDFF",
  marginBottom: "10px",
}

class ProjectBounties extends Component{

  render(){
    return(
      <div>
      <Segment>
        {this.props.currentProject.bounties.map(bount => <BountyCardSmall key={bount.id} bounty={bount} project={this.props.currentProject}/> )}
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentProject: store.currentProject,
})

export default withRouter(connect(mapStateToProps)(ProjectBounties));
