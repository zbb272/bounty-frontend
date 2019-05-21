import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from '../../components/navBar';
import DashboardUserInformation from './dashboardUserInformation'
import DashboardUserProjects from './dashboardUserProjects'
import DashboardUserBounties from './dashboardUserBounties'

const loginFormStyle = {
  height: "100%",
  marginTop: "25%",
}

const bountiesStyle = {
  marginRight: 10,
}

class DashboardPage extends Component {
  render(){
    return(
      <div>
        { !this.props.userAuthenticated ?
        <Redirect to={{
          pathname: "/login"
        }}/>
        :
        <div className='dashboard-page' style={loginFormStyle}>
          <NavBar />
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <DashboardUserInformation />
              </Grid.Column>

              <Grid.Column width={11}>
                <Segment style={bountiesStyle}>
                  <Grid columns="equal">
                    <Grid.Row columns="equal">
                    <Grid.Column>
                      <h1>Current Projects</h1>
                      <DashboardUserProjects />
                    </Grid.Column>
                    <Grid.Column>
                      <h1>Current Bounties</h1>
                      <DashboardUserBounties />
                    </Grid.Column>
                    </Grid.Row>
                  </Grid>
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
  userAuthenticated: store.userAuthenticated
})

export default withRouter(connect(mapStateToProps)(DashboardPage));