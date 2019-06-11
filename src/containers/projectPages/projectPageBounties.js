import React, { Component } from 'react';
import { Grid, Segment, Icon, Menu, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from '../../components/navBar';
import ProjectInformation from './projectInformation'
import ProjectBounties from '../../components/projectPageComponents/projectBounties'
import { getProjectWithId } from '../../redux/actionCreators'
import { backgroundColor2 } from '../../style/theme'

const loginFormStyle = {
  height: "100%",
  marginTop: 75,
}

const bountiesStyle = {
  marginRight: 10,
}


class ProjectPageBounties extends Component {
  constructor(props){
    super(props)
    this.state = {
      projectId: parseInt(this.props.match.params.id),
    }
  }

  componentDidMount(){
    if(!this.state.currentProject){
      this.props.getProjectWithId(this.state.projectId)
    }
    else if(this.state.currentProject.id !== this.stat.projectId){
      this.props.getProjectWithId(this.state.projectId)
    }
  }

  render(){
    return(
      <div>
        { !this.props.currentProject ?
          <div><Icon loading size='big' name='circle notch' /></div>
        :
        <div className='dashboard-page' style={loginFormStyle}>
          <NavBar />
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <ProjectInformation />
              </Grid.Column>

              <Grid.Column width={11}>
                <Segment style={bountiesStyle}>
                  <Menu attached tabular widths={3}>
                    <Menu.Item style={backgroundColor2} as={Link} to={`/projects/${this.props.currentProject.id}`}>Files</Menu.Item>
                    <Menu.Item active as={Link} to={`/projects/${this.props.currentProject.id}/bounties`}>Bounties</Menu.Item>
                    <Menu.Item style={backgroundColor2} as={Link} to={`/projects/${this.props.currentProject.id}/contributors`}>Contributors</Menu.Item>
                  </Menu>
                  <Segment attached>
                    {this.props.currentProject.user.id === this.props.currentUser.id ?
                      <p style={{textAlign: "left"}}><Link to={`/projects/${this.props.currentProject.id}/bounties/new`}>
                        <Button color="blue" >Create a new bounty</Button></Link></p>
                      : null
                    }

                    <ProjectBounties />
                  </Segment>
                </Segment>
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
  userAuthenticated: store.userAuthenticated,
  currentProject: store.currentProject
})

const mapDispatchToProps = (dispatch) => ({
  getProjectWithId: (projectId)=>{dispatch( getProjectWithId(projectId) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectPageBounties));
