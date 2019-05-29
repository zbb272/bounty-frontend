import React, { Component } from 'react';
import { Grid, Segment, Icon, Menu, Button } from 'semantic-ui-react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import BountyCardSmallBrowse from '../../components/bountyCardComponents/bountyCardSmallBrowse'
import UserCardSmallSearch from '../../components/userCardComponents/userCardSmallSearch'
import ProjectCardSmallBrowse from '../../components/projectCardComponents/projectCardSmallBrowse'
import NavBar from '../../components/navBar';
import { backgroundColor2 } from '../../style/theme'

class SearchResultsPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm: (this.props.match.params.searchTerm).toLowerCase(),
      bountiesResults: [],
      bountiesTagResults: [],
      projectResults: [],
      userResults: [],
      userTagResults: [],
    }
  }

  fetchBounties(){
    fetch("http://localhost:3000/api/v1/bounties")
      .then(res => res.json())
      .then(data => {
        let bountsResults = data.filter(b => b.title.toLowerCase().includes(this.state.searchTerm))
        let bountTagResults = data.filter(b => {
          b.tags.forEach(tag => {
            if(tag.name.toLowerCase() === this.state.searchTerm){
              return true;
            }
          })
          return false
        })
        this.setState({
          bountiesResults: bountsResults,
          bountiesTagResults: bountTagResults,
        })
      })
  }

  fetchUsers(){
    fetch("http://localhost:3000/api/v1/users")
      .then(res => res.json())
      .then(data => {
        let usersResults = data.filter(u => u.username.toLowerCase().includes(this.state.searchTerm))
        let usersTagResults = data.filter(u => {
          u.tags.forEach(tag => {
            if(tag.name.toLowerCase() === this.state.searchTerm){
              return true;
            }
          })
          return false
        })
        this.setState({
          userResults: usersResults,
          userTagResults: usersTagResults,
        })
      })
  }

  fetchProjects(){
    fetch("http://localhost:3000/api/v1/projects")
      .then(res => res.json())
      .then(data => {
        let projResults = data.filter(p => p.name.toLowerCase().includes(this.state.searchTerm))
        this.setState({
          projectResults: projResults,
        })
      })
  }

  componentDidMount(){
    console.log(this.state.searchTerm)
    this.fetchBounties()
    this.fetchUsers()
    this.fetchProjects()
  }

  render(){
    return(
      <div>
        <NavBar />
        <Grid style={{marginTop: 75}}>
          <Grid.Row>
            <Grid.Column width={2}>
            </Grid.Column>

            <Grid.Column width={12}>
              <Segment style={backgroundColor2}>
                <Segment>
                  <h2 style={{textAlign: "left"}}>Bounties Results</h2>
                    { this.state.bountiesResults.length === 0 ?
                      <h4>No Results</h4>
                      :
                      this.state.bountiesResults.map(bount =>
                      <BountyCardSmallBrowse key={bount.id} bounty={bount} />
                    )}
                </Segment>
              </Segment>
              <Segment style={backgroundColor2}>
                <Segment>
                  <h2 style={{textAlign: "left"}}>Project Results</h2>
                    { this.state.projectResults.length === 0 ?
                      <h4>No Results</h4>
                      :
                      this.state.projectResults.map(proj =>
                      <ProjectCardSmallBrowse key={proj.id} project={proj} />
                    )}
                </Segment>
              </Segment>
              <Segment style={backgroundColor2}>
                <Segment>
                  <h2 style={{textAlign: "left"}}>User Results</h2>
                    { this.state.userResults.length === 0 ?
                      <h4>No Results</h4>
                      :
                      this.state.userResults.map(userObj =>
                      <UserCardSmallSearch key={userObj.id} user={userObj} />
                    )}
                </Segment>
              </Segment>
            </Grid.Column>
            <Grid.Column width={2}>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}

export default withRouter(SearchResultsPage);
