import React, { Component } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import {createUser} from '../../redux/actionCreators';
import {connect} from 'react-redux'

const segmentStyle = {
  background: "#031229"
}

class SignUpForm extends Component{
  constructor(){
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    }
  }


  onFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.password !== this.state.passwordConfirm){
      alert("Passwords do not match")
    } else{
      this.props.createUser(this.state)
    }
  }

  render(){
    return(
      <Form size='large' onSubmit={ this.onFormSubmit }>
        <Segment stacked style={segmentStyle}>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={
              e => { this.setState({username: e.target.value})}
            }/>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={
              e => { this.setState({email: e.target.value})}
            }/>
          <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={
              e => { this.setState({password: e.target.value})}
            }/>
          <Form.Input fluid icon='lock' iconPosition='left' placeholder='Confirm Password' type='password' onChange={
              e => { this.setState({passwordConfirm: e.target.value})}
            }/>

          <Button color='blue' fluid size='large'>
            Create Account
          </Button>
        </Segment>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createUser: (credentials) => {dispatch( createUser(credentials) )}
})

export default withRouter(connect(mapDispatchToProps, {createUser})(SignUpForm));
