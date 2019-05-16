import React, { Component } from 'react';
import { Segment, TextArea, Form, Button } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"

const imageStyle = {
  maxWidth: 75,
  marginLeft: "auto",
  marginRight: "auto",
}

const headerStyle = {
  color: "#E1EDFF",
  marginBottom: "10px",
}

const segmentStyle = {

}

class EditUserInfo extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
      description: this.props.currentUser.description,
      newPassword: "",
      confNewPassword: "",
      password: "",
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
  }

  render(){
    console.log(this.props)
    return(
      <div>
        <Form size='large' onSubmit={ this.onFormSubmit }>
          <Segment stacked style={segmentStyle}>
            <Form.Input fluid size="big" icon='user' iconPosition='left' placeholder={this.state.username} onChange={
                e => { this.setState({email: e.target.value})}
              } />
            <Form.Input fluid icon='user' iconPosition='left' placeholder={this.state.email} onChange={
                e => { this.setState({email: e.target.value})}
              } />
            <TextArea fluid icon='bars' iconPosition='left' placeholder={this.state.description} onChange={
                e => { this.setState({description: e.target.value})}
              } />
            <Form.Input fluid icon='lock' iconPosition='left' placeholder='New Password' type='password' onChange={
                e => { this.setState({newPassword: e.target.value})}
              }  />
            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Confirm New Password' type='password' onChange={
                e => { this.setState({confNewpassword: e.target.value})}
              }  />
            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Current Password' type='password' onChange={
                e => { this.setState({password: e.target.value})}
              }  />
            <Button color='blue' fluid size='large'>
              Submit
            </Button>
          </Segment>
        </Form>
        <Button color='red' fluid size='large'>
          Delete Profile
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

export default withRouter(connect(mapStateToProps)(EditUserInfo));
