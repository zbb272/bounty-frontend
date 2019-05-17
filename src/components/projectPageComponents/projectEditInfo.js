import React, { Component } from 'react';
import { Icon, Segment, TextArea, Form, Button } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import { editProject } from '../../redux/actionCreators';
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


const projectInfoStyle = {
  marginLeft: 10,
}

class ProjectEditInfo extends Component{
  constructor(props){
    super(props)
    this.state = {
      name: this.props.currentProject.name,
      description: this.props.currentProject.description,
      github: this.props.currentProject.github_url,
      password: "",
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if(this.props.currentProject.user.id !== this.props.currentUser.id){
      alert("You are not authorized to edit this project.")
    }
    else if(this.state.password !== this.props.currentUser.password_digest){
      alert("Password incorrect")
    }
    else {
      let projObj = {
        id: this.props.currentProject.id,
        name: this.state.name,
        description: this.state.description,
        github_url: this.state.github,
      }
      this.props.editProject(projObj)
      this.props.history.push(`/projects/${this.props.currentProject.id}`)
    }
  }

  render(){
    return(
      <div className='project-information' style={projectInfoStyle}>
        <Segment>
          <Segment>
            <Icon name="folder open" size="massive" />
          </Segment>
          <Form size='large' onSubmit={ this.onFormSubmit }>
            <Segment stacked >
              <Form.Input fluid size="big" icon='folder' iconPosition='left' placeholder="Project Name" value={this.state.name} onChange={
                  e => { this.setState({name: e.target.value})}
                } />
              <Form.Input fluid icon='github' iconPosition='left' placeholder="Github URL" value={this.state.github} onChange={
                  e => { this.setState({github: e.target.value})}
                } />
              <TextArea fluid icon='bars' iconPosition='left' placeholder="description..." value={this.state.description} onChange={
                  e => { this.setState({description: e.target.value})}
                } />
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Current Password' type='password' onChange={
                  e => { this.setState({password: e.target.value})}
                }  />
              <Button color='blue' fluid size='large'>
                Submit
              </Button>
            </Segment>
          </Form>
          <Button color='red' fluid size='large'>
            Delete Project
          </Button>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentProject: store.currentProject,
  currentUser: store.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  editProject: (projObj) => {dispatch( editProject(projObj) )}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectEditInfo));
