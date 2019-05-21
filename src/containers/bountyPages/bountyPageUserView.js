import React, { Component } from 'react';
import { Form, Segment, TextArea, Button } from 'semantic-ui-react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from '../../components/navBar';
import ProjectInformation from '../projectPages/projectInformation'
import ProjectFiles from '../../components/projectPageComponents/projectFiles'
import BountyInfoTop from '../../components/bountyPageComponents/bountyInfoTop'
import ApplicationCardSmall from '../../components/applicationCardComponents/applicationCardSmall'
import BountyPageUserApply from '../../components/bountyPageComponents/bountyPageUserApply'
import { getProjectWithId } from '../../redux/actionCreators'

const loginFormStyle = {
  height: "100%",
  marginTop: "25%",
}

const bountiesStyle = {
  marginRight: 10,
}

class BountyPageUserView extends Component {
  constructor(props){
    super(props)
    this.state = {
      projectId: parseInt(this.props.match.params.id),
      bountyId: parseInt(this.props.match.params.bountyId),
    }
  }

  render(){
    let app = undefined;
    let comp = []
    if(this.props.currentBounty.status === "open"){
      console.log(this.props.currentUser.applications)
      app = this.props.currentUser.applications.find(app => app.bounty_id === this.state.bountyId);
      if(app !== undefined){
        comp.push(<h1>Application is pending</h1>)
      }
    } else if(this.props.currentBounty.status === "working"){
      app = this.props.currentUser.applications.find(app => app.bounty_id === this.state.bountyId);
      if(app !== undefined){
        comp.push(<h1>Application is being worked on by you</h1>)
      }
    } else if(this.props.currentBounty.status === "cancelled"){
      app = this.props.currentUser.applications.find(app => app.bounty_id === this.state.bountyId);
      if(app !== undefined){
        comp.push(<h1>Application is cancelled</h1>)
      }
    } else if(this.props.currentBounty.status === "completed"){
      app = this.props.currentUser.applications.find(app => app.bounty_id === this.state.bountyId);
      if(app !== undefined){
        comp.push(<h1>Application is completed by you</h1>)
      }
    }

    if(app === undefined){
      comp.push(<BountyPageUserApply />)
    }

    console.log(app)
    return(
      <div>
        {comp}
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
  // getProjectWithId: (projectId)=>{dispatch( getProjectWithId(projectId) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BountyPageUserView));
