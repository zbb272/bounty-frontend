import React, { Component } from 'react';
import { Grid, Icon, Segment, Menu, Form, Button, TextArea } from 'semantic-ui-react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import NavBar from '../../components/navBar'
import ProjectInformation from '../projectPages/projectInformation'
import { getProjectWithId, createBounty } from '../../redux/actionCreators'
import NewBountyTagDropdown from '../../components/bountyPageComponents/newBountyTagDropdown'
import { backgroundColor2 } from '../../style/theme'

const loginFormStyle = {
  height: "100%",
  marginTop: 75,
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
      selectedTags: [],
      tags: [],
    }
  }

  componentDidMount(){
    if(!this.props.currentProject){
      this.props.getProjectWithId(this.state.projectId)
    }
    else if(this.props.currentProject.id !== this.state.projectId){
      this.props.getProjectWithId(this.state.projectId)
    }
    //fetch all tags here
    fetch("http://localhost:3000/api/v1/tags")
      .then(res => res.json() )
      .then(data => {
        this.setState({tags: data})
      })
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    if(this.state.title === "" || this.state.amount === "" || this.state.description === "" || this.state.selectedTags.length === 0){
      window.alert("Cannot have empty fields.")
    }
    else{
      let tagsToSend = []
      this.state.tags.forEach(tag => {
        if(this.state.selectedTags.includes(tag.name)){
          tagsToSend.push(tag);
        }
      })
      let bountyObj = {
        title: this.state.title,
        amount: this.state.amount,
        description: this.state.description,
        status: "open",
        project_id: this.state.projectId,
        tags: tagsToSend,
      }
      this.props.createBounty(bountyObj);
      this.props.history.push(`/projects/${this.state.projectId}`)
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
                    <div style={bountiesStyle}>
                      <Segment style={backgroundColor2}>
                        <Segment>
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
                              { this.state.tags.length > 0 ?
                                <NewBountyTagDropdown tags={this.state.tags} changeHandler={this.tagSelectChangHandler}/>
                              :
                                null
                              }
                              <Button style={{marginTop: 10}} color='blue' fluid size='large'>
                                Post Bounty
                              </Button>
                            </Segment>
                            </Form>
                          </Segment>
                        </Segment>
                      </div>

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
