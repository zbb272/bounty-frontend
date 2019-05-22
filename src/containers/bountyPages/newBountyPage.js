import React, { Component } from 'react';
import { Grid, Icon, Segment, Menu, Form, Button, TextArea } from 'semantic-ui-react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import NavBar from '../../components/navBar'
import ProjectInformation from '../projectPages/projectInformation'
import { getProjectWithId, createBounty } from '../../redux/actionCreators'

const loginFormStyle = {
  height: "100%",
  marginTop: "25%",
}

const bountiesStyle = {
  marginRight: 10,
}

const segmentStyle = {
  background: "#031229",
  maxWidth: "25%",
}

const formFieldStyle = {
  maxWidth: "25%",
}


class NewBountyPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      projectId: parseInt(this.props.match.params.id),
      title: "",
      amount: "",
      description: "",
    }
  }

  componentDidMount(){
    if(!this.props.currentProject){
      this.props.getProjectWithId(this.state.projectId)
    }
    else if(this.props.currentProject.id !== this.state.projectId){
      this.props.getProjectWithId(this.state.projectId)
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    let bountyObj = {
      title: this.state.title,
      amount: this.state.amount,
      description: this.state.description,
      status: "open",
      project_id: this.state.projectId,
    }
    this.props.createBounty(bountyObj);
    this.props.history.push(`/projects/${this.state.projectId}`)
  }

  render(){
    return(
      <div>
        { !this.props.currentProject ?
          <div><Icon loading size='big' name='circle notch' /></div>
        :
          <div className='new-bounty-page' style={loginFormStyle}>
            <NavBar/>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={5}>
                    <ProjectInformation />
                  </Grid.Column>

                  <Grid.Column width={11}>
                    <Segment style={bountiesStyle}>
                      <h2 style={{textAlign: "left"}}>Create New Bounty</h2>
                      <Form size='large' onSubmit={ this.onFormSubmit }>
                        <Segment stacked style={segmentStyle}>
                          <Form.Input fluid icon='info' iconPosition='left' placeholder='Title' onChange={
                              e => { this.setState({title: e.target.value})}
                            }/>
                          <Form.Input fluid icon='dollar' iconPosition='left' placeholder='Amount' onChange={
                              e => { this.setState({amount: e.target.value})}
                            }/>
                          <TextArea fluid icon='bars' iconPosition='left' placeholder="description..." value={this.state.description} onChange={
                              e => { this.setState({description: e.target.value})}
                            } />

                          <Button style={{marginTop: 10}} color='blue' fluid size='large'>
                            Post Bounty
                          </Button>
                        </Segment>
                      </Form>
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
  createBounty: (bountyObj)=>{dispatch( createBounty(bountyObj) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewBountyPage));
