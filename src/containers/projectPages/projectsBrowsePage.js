import React, { Component } from 'react';
import { Grid, Icon, Segment, Menu, Form, Button, TextArea } from 'semantic-ui-react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import NavBar from '../../components/navBar'
import ProjectInformation from '../projectPages/projectInformation'
import ProjectCardSmallBrowse from '../../components/projectCardComponents/projectCardSmallBrowse'
import { createProject } from '../../redux/actionCreators'
import { backgroundColor3, backgroundColor2 } from '../../style/theme'

const loginFormStyle = {
  height: "100%",
  marginTop: 75,
}

class ProjectsBrowsePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      highestRatedProjects: [],
      projectsWithMostBounties: [],
      projectsAlmostCompleted: [],
      randomProjects: [],
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/projects")
      .then(res => res.json())
      .then(data => {
        let allProjects = [];
        let highRatedProjects = [];
        let projectsWithMostBounts = [];
        let projectsAlmostComplete = [];
        let randomProjects = [];
        data.forEach(project => {
          if(project.user.id !== this.props.currentUser.id){
            allProjects.push(project)
          }
        })

        allProjects.sort((a, b) => {
          return b.bounties.length - a.bounties.length
        })
        let  i = 0
        while(projectsWithMostBounts.length < 5 && projectsWithMostBounts.length < allProjects.length){
          projectsWithMostBounts.push(allProjects[i])
          i++;
        }

        allProjects.sort((a, b) => {
          let bAverage = 0;
          b.reviews.forEach(rev => b.bAverage += rev.rating)
          bAverage = bAverage / b.reviews.length
          let aAverage = 0;
          a.reviews.forEach(rev => a.aAverage += rev.rating)
          aAverage = aAverage / a.reviews.length
          return bAverage - aAverage
        })
        i = 0
        while(highRatedProjects.length < 5 && highRatedProjects.length < allProjects.length){
          highRatedProjects.push(allProjects[i])
          i++;
        }


        let projWithHighProgress = allProjects.filter(proj => proj.progress < 100 && proj.progress > 70)
        i = 0
        while(projectsAlmostComplete.length < 5 && projectsAlmostComplete.length < projWithHighProgress.length){
          projectsAlmostComplete.push(projWithHighProgress[i])
          i++;
        }

        this.setState({
          projectsWithMostBounties: projectsWithMostBounts,
          highestRatedProjects: highRatedProjects,
          projectsAlmostCompleted: projectsAlmostComplete,
        })
      })
  }

  render(){
    return(
      <div className='browse-projects-page' style={loginFormStyle}>
        <NavBar/>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
              </Grid.Column>

              <Grid.Column width={12}>
                <Segment style={backgroundColor2}>
                  <Segment>
                    <h2 style={{textAlign: "left"}}>Projects With Most Bounties</h2>
                      {this.state.projectsWithMostBounties.map(proj =>
                        <ProjectCardSmallBrowse key={proj.id} project={proj} />
                      )}
                  </Segment>
                </Segment>
                <Segment style={backgroundColor2}>
                  <Segment>
                    <h2 style={{textAlign: "left"}}>Highest Rated Projects</h2>
                      {this.state.highestRatedProjects.map(proj =>
                        <ProjectCardSmallBrowse key={proj.id} project={proj} />
                      )}
                  </Segment>
                </Segment>
                <Segment style={backgroundColor2}>
                  <Segment>
                    <h2 style={{textAlign: "left"}}>Projects That Are Almost Complete</h2>
                      {this.state.projectsAlmostCompleted.map(proj =>
                        <ProjectCardSmallBrowse key={proj.id} project={proj} />
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
const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
  userAuthenticated: store.userAuthenticated,
})

const mapDispatchToProps = (dispatch) => ({
  // createProject: (projectObj)=>{dispatch( createProject(projectObj) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsBrowsePage));
