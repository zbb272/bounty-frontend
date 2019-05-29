import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import ApplicationCardSmall from '../../components/applicationCardComponents/applicationCardSmall'
import BountyCardProjectOwnerWorking from '../../components/bountyCardComponents/bountyCardProjectOwnerWorking'
import BountyCardProjectOwnerPending from '../../components/bountyCardComponents/bountyCardProjectOwnerPending'
import BountyCardProjectOwnerComplete from '../../components/bountyCardComponents/bountyCardProjectOwnerComplete'
import { getProjectWithId } from '../../redux/actionCreators'
import { backgroundColor2 } from '../../style/theme'


class BountyPageOwnerView extends Component {
  constructor(props){
    super(props)
    this.state = {
      projectId: parseInt(this.props.match.params.id),
      bountyId: parseInt(this.props.match.params.bountyId),
    }
  }

  render(){
    let applicationsComp = []
    if(this.props.currentBounty.status === "open" && this.props.currentBounty.applications.length === 0){
      applicationsComp.push(<h1 key="what">Currently no applications for this bounty</h1>)
    }else if (this.props.currentBounty.status === "open") {
      applicationsComp = this.props.currentBounty.applications.map(app =>
        <ApplicationCardSmall key={app.id} application={app}/>
      )
    }
    return(
      <div>
        <Segment>
          {this.props.currentBounty.status === "open" ?
            <Segment style={backgroundColor2}>{applicationsComp}</Segment>
          : null }
          {this.props.currentBounty.status === "working" ?
            <BountyCardProjectOwnerWorking />
            : null}
          {this.props.currentBounty.status === "pending" ?
            <BountyCardProjectOwnerPending />
            : null}
          {this.props.currentBounty.status === "completed" ?
            <BountyCardProjectOwnerComplete />
            : null}
          {this.props.currentBounty.status.includes("cancelled") ?
            <h1>Bounty has been {this.props.currentBounty.status}</h1>
            : null}
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
  userAuthenticated: store.userAuthenticated,
  currentProject: store.currentProject,
  currentBounty: store.currentBounty,
})

const mapDispatchToProps = (dispatch) => ({
  getProjectWithId: (projectId)=>{dispatch( getProjectWithId(projectId) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BountyPageOwnerView));
