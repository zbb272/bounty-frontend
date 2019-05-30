import React, { Component } from 'react';
import { Icon, Segment, TextArea, Form, Button } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import { editUser } from '../../redux/actionCreators';
import { connect } from "react-redux"
import { backgroundColor3, backgroundColor2 } from '../../style/theme'
import NewBountyTagDropdown from '../../components/bountyPageComponents/newBountyTagDropdown'

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
      selectedTags: [],
      tags: [],
      newTagName: "",
      options: [],
    }
  }

  componentDidMount(){
    console.log(this.props)
    //fetch all tags here
    fetch("http://localhost:3000/api/v1/tags")
      .then(res => res.json() )
      .then(data => {
        let newOptions = [];
        let userTagNames = [];
        this.props.currentUser.tags.forEach(tag => {
          userTagNames.push(tag.name)
        })
        data.forEach(tag => {
          if(!userTagNames.includes(tag.name)){
            newOptions.push({
              key: tag.name,
              text: tag.name,
              value: tag.name,
            })
          }

        })
        this.setState({
          options: newOptions,
          tags: data,
        })
      })
  }

  createNewTag = (event) => {
    event.preventDefault();

    let tagNames = this.state.tags.map(tag => tag.name)
    if(this.state.newTagName !== "" && !tagNames.includes(this.state.newTagName)){
      console.log("here")
      fetch("http://localhost:3000/api/v1/tags",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: this.state.newTagName})
      }).then(res => res.json())
        .then(data => {
          let newTags = [...this.state.tags]
          newTags.push(data);

          let newOptions = JSON.parse(JSON.stringify([...this.state.options]));
          newOptions.push({
              key: data.name,
              text: data.name,
              value: data.name,
          })
          this.setState({
            options: newOptions,
            tags: newTags,
            newTagName: ""
          })

        })
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

  onFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.password !== this.props.currentUser.password_digest){
      alert("Password incorrect")
    } else{
      let tagsToSend = []
      this.state.tags.forEach(tag => {
        if(this.state.selectedTags.includes(tag.name)){
          tagsToSend.push(tag.id);
        }
      })

      if(this.state.newPassword === ""){
        let userObj = {
          id: this.props.currentUser.id,
          username: this.state.username,
          email: this.state.email,
          github_url: this.state.github,
          description: this.state.description,
          password_digest: this.state.password,
          newtag_ids: tagsToSend,
        }
        this.props.editUser(userObj)
        this.props.history.push("/dashboard")
      }
      else{
        if(this.state.newPassword !== this.state.confNewPassword){
          alert("New Password does not match confirmation")
        } else{
          let userObj = {
            id: this.props.currentUser.id,
            username: this.state.username,
            email: this.state.email,
            github_url: this.state.github,
            description: this.state.description,
            password_digest: this.state.newPassword,
            newtag_ids: tagsToSend,
          }
          this.props.editUser(userObj)
          this.props.history.push("/dashboard")
        }
      }
    }
  }

  tagDeleteHandler = (event) => {
    event.preventDefault();
    // console.log(event.currentTarget.innerText)
    // let tagToDelete = this.state.tags.find(tag => tag.name === event.currentTarget.innerText)
    // if(tagToDelete !== undefined){
    //   let userObj = {
    //     id: this.props.currentUser.id,
    //     description: this.props.currentUser.description,
    //     deletetag: tagToDelete.id,
    //   }
    //   console.log(userObj)
    //   this.props.editUser(userObj)
    //   console.log(tagToDelete)
    // }
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

            <h4>Add new tags to your profile: </h4>
            <Form.Group inline>
              <Form.Input style={{marginTop: 15}} icon="tag" iconPosition='left' value={this.state.newTagName} placeholder='Add a new tag' onChange={
                  e => { this.setState({newTagName: e.target.value})}
                }/>
              <Button style={{marginTop: 15}} onClick={this.createNewTag} color='blue' size='medium'>
                Create Tag
              </Button>
            </Form.Group>

            { this.state.options !== undefined && this.state.options.length > 0 ?
              <NewBountyTagDropdown options={this.state.options} changeHandler={this.tagSelectChangHandler}/>
            :
              null
            }

            <h4>Your tags: </h4>
            { this.props.currentUser.tags.map(tag => {
              return <Button onClick={this.tagDeleteHandler} icon='cancel' label={{ as: 'a', basic: true, content: tag.name }} labelPosition='right' />
            })}


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
