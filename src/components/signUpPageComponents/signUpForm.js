import React, { Component } from 'react';
import { Form, Segment, Button, TextArea } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import {createUser} from '../../redux/actionCreators';
import {connect} from 'react-redux'
import NewBountyTagDropdown from '../../components/bountyPageComponents/newBountyTagDropdown'

const segmentStyle = {
  background: "#031229"
}

class SignUpForm extends Component{
  constructor(){
    super();
    this.state = {
      username: "",
      email: "",
      github: "",
      description: "",
      password: "",
      passwordConfirm: "",
      selectedTags: [],
      tags: [],
      options: [],
    }
  }

  tagSelectChangHandler = (event) => {
    let newTag = event.target.textContent
    let newSelectedTags = [...this.state.selectedTags]
    if(this.state.selectedTags.includes(newTag)){
      newSelectedTags.splice(this.state.selectedTags.indexOf(newTag, 1));
    }
    else {
      newSelectedTags.push(newTag);
    }
    this.setState({selectedTags: newSelectedTags})
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/tags")
      .then(res => res.json() )
      .then(data => {
        let newOptions = [];
        data.forEach(tag => {
          newOptions.push({
            key: tag.name,
            text: tag.name,
            value: tag.name,
          })
        })
        this.setState({
          options: newOptions,
          tags: data,
        })
      })
  }


  onFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.password !== this.state.passwordConfirm){
      alert("Passwords do not match")
    } else{
      let tagsToSend = []
      this.state.tags.forEach(tag => {
        if(this.state.selectedTags.includes(tag.name)){
          tagsToSend.push(tag.id);
        }
      })

      let userObj = {
        username: this.state.username,
        email: this.state.email,
        github_url: this.state.github,
        description: this.state.description,
        password_digest: this.state.password,
        newtag_ids: tagsToSend,
      }
      this.props.createUser(userObj)
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
          <Form.Input fluid icon='github' iconPosition='left' placeholder="Github URL" value={this.state.github} onChange={
              e => { this.setState({github_url: e.target.value})}
            } />
          <TextArea iconPosition='left' placeholder="description..." value={this.state.description} onChange={
              e => { this.setState({description: e.target.value})}
            } />

          { this.state.options !== undefined && this.state.options.length > 0 ?
            <NewBountyTagDropdown options={this.state.options} changeHandler={this.tagSelectChangHandler}/>
          :
            null
          }

          <Form.Input style={{marginTop: 15}} fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={
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
