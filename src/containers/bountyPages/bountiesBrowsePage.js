import React, { Component } from 'react';
import { Grid, Icon, Segment, Menu, Form, Button, TextArea } from 'semantic-ui-react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import NavBar from '../../components/navBar'
import ProjectInformation from '../projectPages/projectInformation'
import { createProject } from '../../redux/actionCreators'
import { backgroundColor3, backgroundColor2 } from '../../style/theme'

const loginFormStyle = {
  height: "100%",
  marginTop: 75,
}

class BountiesBrowsePage extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     name: "",
  //     githubUrl: "",
  //     description: "",
  //   }
  // }

  // onFormSubmit = (event) => {
  //   event.preventDefault();
  //   let projectObj = {
  //     name: this.state.name,
  //     github_url: this.state.amount,
  //     description: this.state.description,
  //     progress: 0,
  //     user_id: this.props.currentUser.id,
  //   }
  //   this.props.createProject(projectObj);
  //   this.props.history.push(`/dashboard`)
  // }

  render(){
    return(
      <div className='browse-projects-page' style={loginFormStyle}>
        <NavBar/>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
              </Grid.Column>

              <Grid.Column width={12}>
                <Segment style={backgroundColor2}>
                  <Segment>
                    <h2 style={{textAlign: "left"}}>Bounties from High Rated Projects</h2>
                      <Button style={{marginTop: 10}} color='blue' fluid size='large'>
                        Placeholder
                      </Button>
                  </Segment>
                </Segment>
                <Segment style={backgroundColor2}>
                  <Segment>
                    <h2 style={{textAlign: "left"}}>Highest Paying Bounties</h2>
                      <Button style={{marginTop: 10}} color='blue' fluid size='large'>
                        Placeholder
                      </Button>
                  </Segment>
                </Segment>
                <Segment style={backgroundColor2}>
                  <Segment>
                    <h2 style={{textAlign: "left"}}>Random Bounties</h2>
                      <Button style={{marginTop: 10}} color='blue' fluid size='large'>
                        Placeholder
                      </Button>
                  </Segment>
                </Segment>
              </Grid.Column>
              <Grid.Column width={2}>

              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    )
  }
}
const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
  userAuthenticated: store.userAuthenticated,
})

const mapDispatchToProps = (dispatch) => ({
  // createProject: (projectObj)=>{dispatch( createProject(projectObj) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BountiesBrowsePage));