import React, { Component } from 'react';
import { Icon, Segment, TextArea, Form, Button } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import { editUser } from '../../redux/actionCreators';
import { connect } from "react-redux"
import { backgroundColor3, backgroundColor2 } from '../../style/theme'

const imageStyle = {
  maxWidth: 75,
  marginLeft: "auto",
  marginRight: "auto",
}

const headerStyle = {
  color: "#E1EDFF",
  marginBottom: "10px",
}

class EditUserInfo extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
      github: this.props.currentUser.github_url,
      description: this.props.currentUser.description,
      newPassword: "",
      confNewPassword: "",
      password: "",
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.password !== this.props.currentUser.password_digest){
      alert("Password incorrect")
    } else{
      if(this.state.newPassword === ""){
        let userObj = {
          id: this.props.currentUser.id,
          username: this.state.username,
          email: this.state.email,
          github_url: this.state.github,
          description: this.state.description,
          password_digest: this.state.password,
        }
        this.props.editUser(userObj)
        this.props.history.push("/dashboard")
      }
      else{
        if(this.state.newPassword !== this.state.confNewPassword){
          alert("New Password does not match confirmation")
        } else{
          let userObj = {
            username: this.state.username,
            email: this.state.email,
            github_url: this.state.github,
            description: this.state.description,
            password_digest: this.state.newPassword,
          }
          this.props.editUser(userObj)
          this.props.history.push("/dashboard")
        }
      }
    }
  }

  render(){
    return(
      <Segment style={backgroundColor2}>
        <Segment>
          <Icon name="user" size="massive" />
        </Segment>
        <Form size='large' onSubmit={ this.onFormSubmit }>
          <Segment stacked style={backgroundColor3}>
            <Form.Input fluid size="big" icon='user' iconPosition='left' placeholder="Username" value={this.state.username} onChange={
                e => { this.setState({username: e.target.value})}
              } />
            <Form.Input fluid icon='user' iconPosition='left' placeholder="Email" value={this.state.email} onChange={
                e => { this.setState({email: e.target.value})}
              } />
            <Form.Input fluid icon='github' iconPosition='left' placeholder="Github URL" value={this.state.github} onChange={
                e => { this.setState({github: e.target.value})}
              } />
            <TextArea fluid icon='bars' iconPosition='left' placeholder="description..." value={this.state.description} onChange={
                e => { this.setState({description: e.target.value})}
              } />
            <Form.Input style={{marginTop: 75}} fluid icon='lock' iconPosition='left' placeholder='New Password' type='password' onChange={
                e => { this.setState({newPassword: e.target.value})}
              }  />
            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Confirm New Password' type='password' onChange={
                e => { this.setState({confNewpassword: e.target.value})}
              }  />
            <Form.Input style={{marginTop: 75}} fluid icon='lock' iconPosition='left' placeholder='Current Password' type='password' onChange={
                e => { this.setState({password: e.target.value})}
              }  />
            <Button color='blue' fluid size='large'>
              Submit
            </Button>
          </Segment>
        </Form>
        <Button style={{marginTop: 15}} color='red' fluid size='large'>
          Delete Profile
        </Button>
      </Segment>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  editUser: (userObj) => {dispatch( editUser(userObj) )}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUserInfo));
