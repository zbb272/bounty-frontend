import React, { Component } from 'react';
import { Grid, Segment, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from '../../components/navBar';
import ProjectInformation from '../projectPages/projectInformation'
import BountyInfoTop from '../../components/bountyPageComponents/bountyInfoTop'
import BountyPageOwnerView from './bountyPageOwnerView'
import BountyPageUserView from './bountyPageUserView'
import { getProjectWithId, getBountyWithId } from '../../redux/actionCreators'
import { backgroundColor2 } from '../../style/theme'

const loginFormStyle = {
  height: "100%",
  marginTop: 75,
}

class BountyPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      projectId: parseInt(this.props.match.params.id),
      bountyId: parseInt(this.props.match.params.bountyId),
    }
  }

  componentDidMount(){
    if(!this.props.currentProject){
      this.props.getProjectWithId(this.state.projectId)
    }
    else if(this.props.currentProject.id !== this.state.projectId){
      this.props.getProjectWithId(this.state.projectId)
    }
    if(!this.props.currentBounty){
      this.props.getBountyWithId(this.state.bountyId)
    }
    else if(this.props.currentBounty.id !== this.state.bountyId){
      this.props.getBountyWithId(this.state.bountyId)
    }
  }

  render(){
    console.log(this.props.currentBounty)
    return(
      <div>
        { !this.props.currentProject || !this.props.currentBounty ?
          <div><Icon loading size='big' name='circle notch' /></div>
        :
        <div className='bounty-page' style={loginFormStyle}>
          <NavBar />
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <ProjectInformation />
              </Grid.Column>

              <Grid.Column width={11}>
                <div style={{marginRight: 10}}>
                  <Segment style={backgroundColor2}>
                    <BountyInfoTop bountyObj={this.props.currentBounty} projObj={this.props.currentProject} />
                    {this.props.currentBounty.project.user_id === this.props.currentUser.id ?
                      <BountyPageOwnerView />
                      : <BountyPageUserView />
                    }
                  </Segment>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
  currentBounty: store.currentBounty,
  userAuthenticated: store.userAuthenticated,
  currentProject: store.currentProject,
})

const mapDispatchToProps = (dispatch) => ({
  getProjectWithId: (projectId)=>{dispatch( getProjectWithId(projectId) )},
  getBountyWithId:  (bountyId) =>{dispatch( getBountyWithId(bountyId)   )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BountyPage));
