import React, { Component } from 'react';
import { Grid, Segment, Icon } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from '../components/navBar';
import UserInformation from './userInformation'
import UserProjects from './userProjects'
import UserBounties from './userBounties'
import { getUserWithId } from '../redux/actionCreators'

const loginFormStyle = {
  height: "100%",
  marginTop: "25%",
}

const bountiesStyle = {
  marginRight: 10,
}

class ProfileDashboardPage extends Component {
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
    console.log(this.props.targetUser)
    return(
      <div>
        <div className='dashboard-page' style={loginFormStyle}>
          <NavBar />
            { !this.props.targetUser ?
              <div><Icon loading size='big' name='circle notch' /></div>
            :
              <Grid>
                <Grid.Row>
                  <Grid.Column width={5}>
                    <UserInformation />
                  </Grid.Column>

                  <Grid.Column width={11}>
                    <Segment style={bountiesStyle}>
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
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
})

const mapDispatchToProps = (dispatch) => ({
  getUserWithId: (userId)=>{dispatch( getUserWithId(userId) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDashboardPage));
