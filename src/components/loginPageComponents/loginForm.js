import React, { Component } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import {loginUser} from '../../redux/actionCreators';
import {connect} from 'react-redux'

const segmentStyle = {
  background: "#031229"
}

class LoginForm extends Component{
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser(this.state)
  }

  render(){
    return(
      <Form size='large' onSubmit={ this.onFormSubmit }>
        <Segment stacked style={segmentStyle}>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={
              e => { this.setState({email: e.target.value})}
            } />
          <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={
              e => { this.setState({password: e.target.value})}
            }  />

          <Button color='blue' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (credentials) => {dispatch( loginUser(credentials) )}
})

export default withRouter(connect(mapDispatchToProps, {loginUser})(LoginForm));
