import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import BountyCardSmall from "../bountyCardComponents/bountyCardSmall"

const segmentStyle = {
  backgroundColor: "#8DA2C0",
}

class ProjectBounties extends Component{

  render(){
    return(
      <div>
      <Segment style={segmentStyle}>
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
