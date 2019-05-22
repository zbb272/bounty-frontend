import React, { Component } from 'react';
import { Form, Segment, TextArea, Button } from 'semantic-ui-react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { createApplication } from '../../redux/actionCreators'

const loginFormStyle = {
  height: "100%",
  marginTop: 75,
}

const bountiesStyle = {
  marginRight: 10,
}

class BountyPageUserApply extends Component {
  constructor(props){
    super(props)
    this.state = {
      projectId: parseInt(this.props.match.params.id),
      bountyId: parseInt(this.props.match.params.bountyId),
      message: "",
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    let applicationObj = {
      user_id: this.props.currentUser.id,
      bounty_id: this.state.bountyId,
      message: this.state.message,
    }
    this.props.createApplication(applicationObj);
  }

  render(){
    return(
      <div>
        <h1>Apply For Bounty</h1>
        <Segment>
          <Form size='large' onSubmit={ this.onFormSubmit }>
            <Segment stacked >
              <TextArea fluid placeholder="message..." value={this.state.message} onChange={
                  e => { this.setState({message: e.target.value})}
                } />
              <Button color='blue' fluid size='medium'>
                Apply
              </Button>
            </Segment>
          </Form>
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
  // getProjectWithId: (projectId)=>{dispatch( getProjectWithId(projectId) )},
  createApplication: (applicationObj)=>{dispatch( createApplication(applicationObj) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BountyPageUserApply));
