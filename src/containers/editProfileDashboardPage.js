import React, { Component } from 'react';
import { Grid, Segment, Button, Icon } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from '../components/navBar';
import EditUserInformation from '../components/userInfoComponents/editUserInfo'
import UserProjects from './userProjects'
import UserBounties from './userBounties'
import { getUserWithId } from '../redux/actionCreators'
import { backgroundColor2 } from '../style/theme'

const loginFormStyle = {
  height: "100%",
  marginTop: 75,
}

const bountiesStyle = {
  marginRight: 10,
}

class EditProfileDashboardPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      userId: parseInt(this.props.match.params.id),
    }
  }

  componentDidMount(){
    if(!this.props.targetUser){
      this.props.getUserWithId(this.state.userId)
    }
    else if(this.props.targetUser.id !== this.state.userId){
      this.props.getUserWithId(this.state.userId)
    }
  }

  render(){
    return(
      <div>
        <div className='dashboard-page' style={loginFormStyle}>
          <NavBar />
            { !this.props.targetUser ?
              <div><Icon loading size='big' name='circle notch' /></div>
            :
              <div>
              {this.props.targetUser.id !== this.props.currentUser.id ?
                <Redirect to={{
                  pathname: `/users/${this.props.targetUser.id}`
                }}/>
                :
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <EditUserInformation />
                    </Grid.Column>

                    <Grid.Column width={11}>
                      <div style={{marginRight: 10}}>
                        <Segment style={backgroundColor2}>
                          <Segment>
                            <Grid columns="equal">
                              <Grid.Row columns="equal">
                              <Grid.Column>
                                <h1>Current Projects</h1>
                                <UserProjects />
                              </Grid.Column>
                              <Grid.Column>
                                <h1>Current Bounties</h1>
                                <UserBounties />
                              </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Segment>
                        </Segment>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              }
              </div>
            }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
  userAuthenticated: store.userAuthenticated,
  targetUser: store.targetUser,
  currentProject: store.currentProject,
})

const mapDispatchToProps = (dispatch) => ({
  getUserWithId: (userId)=>{dispatch( getUserWithId(userId) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfileDashboardPage));
