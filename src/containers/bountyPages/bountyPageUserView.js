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
import BountyCardUserWorking from '../../components/bountyCardComponents/bountyCardUserWorking'
import BountyCardUserComplete from '../../components/bountyCardComponents/bountyCardUserComplete'
import { getProjectWithId } from '../../redux/actionCreators'

const loginFormStyle = {
  height: "100%",
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
        comp.push(<BountyCardUserWorking />)
      }
      else {
        comp.push(<h1>This Bounty is being worked on by someone.</h1>)
      }
    } else if(this.props.currentBounty.status === "pending"){
      app = this.props.currentUser.applications.find(app => app.bounty_id === this.state.bountyId);
      if(app !== undefined){
        comp.push(<h1>Bounty is pending approval from project manager.</h1>)
      }
      else {
        comp.push(<h1>This Bounty is being worked on by someone.</h1>)
      }
    } else if(this.props.currentBounty.status.includes("cancelled")){
      app = this.props.currentUser.applications.find(app => app.bounty_id === this.state.bountyId);
      if(app !== undefined){
        comp.push(<h1>Bounty is {this.props.currentBounty.status}</h1>)
      }
    } else if(this.props.currentBounty.status === "completed"){
      app = this.props.currentUser.applications.find(app => app.bounty_id === this.state.bountyId);
      if(app !== undefined){
        comp.push(<BountyCardUserComplete />)
      }
      else {
        comp.push(<h1>This bounty is completed by someone already.</h1>)
      }
    }

    if(app === undefined){
      comp.push(<BountyPageUserApply />)
    }

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
