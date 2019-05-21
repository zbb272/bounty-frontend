import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import ApplicationCardSmall from '../../components/applicationCardComponents/applicationCardSmall'
import { getProjectWithId } from '../../redux/actionCreators'


class BountyPageOwnerView extends Component {
  constructor(props){
    super(props)
    this.state = {
      projectId: parseInt(this.props.match.params.id),
      bountyId: parseInt(this.props.match.params.bountyId),
    }
  }

  render(){
    return(
      <div>
        <h1>Applicants For Bounty</h1>
        <Segment>
          {this.props.currentBounty.applications.map(app =>
            <ApplicationCardSmall key={app.id} application={app}/>
          )}
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
