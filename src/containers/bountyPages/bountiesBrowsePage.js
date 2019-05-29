import React, { Component } from 'react';
import { Grid, Icon, Segment, Menu, Form, Button, TextArea } from 'semantic-ui-react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import NavBar from '../../components/navBar'
import ProjectInformation from '../projectPages/projectInformation'
import BountyCardSmallBrowse from '../../components/bountyCardComponents/bountyCardSmallBrowse'
import { createProject } from '../../redux/actionCreators'
import { backgroundColor3, backgroundColor2 } from '../../style/theme'

const loginFormStyle = {
  height: "100%",
  marginTop: 75,
}

class BountiesBrowsePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      recommendedBounties: [],
      lowApplicantBounties: [],
      highPayingBounties: [],
      randomBounties: [],
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/bounties")
      .then(res => res.json())
      .then(data => {
        let openBounties = [];
        let recommendBounties = [];
        let bountiesWithLowApplications = [];
        let highestPayingBounties = [];
        let randomBounties = [];
        data.forEach(bounty => {
          if(bounty.status === "open" && bounty.project.user_id !== this.props.currentUser.id){
            openBounties.push(bounty)
          }
        })
        //sort bounties by payment amount
        openBounties.sort((a, b) => {
          return b.amount - a.amount
        })
        let  i = 0
        while(highestPayingBounties.length < 5 && highestPayingBounties.length < openBounties.length){
          highestPayingBounties.push(openBounties[i])
          i++;
        }

        //select bounties with tags that match users
        let userTagsIds = this.props.currentUser.tags.map(tag => tag.id)
        openBounties.forEach(bount => {
          bount.tags.forEach(tag => {
            if(userTagsIds.includes(tag.id) && !recommendBounties.includes(bount)){
              recommendBounties.push(bount);
            }
          })
        })
        if(recommendBounties.length < 5){
          i = 0
          while(recommendBounties.length < 5 && recommendBounties.length < openBounties.length){
            if(!recommendBounties.includes(openBounties[i])){
              recommendBounties.push(openBounties[i])
            }
            i++;
          }
        }

        //sort by number of applicants
        openBounties.sort((a, b) => {
          return b.applications.length - a.applications.length
        })
        i = 0
        while(bountiesWithLowApplications.length < 5 && bountiesWithLowApplications.length < openBounties.length){
          bountiesWithLowApplications.push(openBounties[i])
          i++;
        }

        this.setState({
          highPayingBounties: highestPayingBounties,
          recommendedBounties: recommendBounties,
          lowApplicantBounties: bountiesWithLowApplications,
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
                    <h2 style={{textAlign: "left"}}>Recommended Bounties</h2>
                      {this.state.recommendedBounties.map(bount =>
                        <BountyCardSmallBrowse key={bount.id} bounty={bount} />
                      )}
                  </Segment>
                </Segment>
                <Segment style={backgroundColor2}>
                  <Segment>
                    <h2 style={{textAlign: "left"}}>Highest Paying Bounties</h2>
                      {this.state.highPayingBounties.map(bount =>
                        <BountyCardSmallBrowse key={bount.id} bounty={bount} />
                      )}
                  </Segment>
                </Segment>
                <Segment style={backgroundColor2}>
                  <Segment>
                    <h2 style={{textAlign: "left"}}>Bounties That Need More Applicants</h2>
                      {this.state.lowApplicantBounties.map(bount =>
                        <BountyCardSmallBrowse key={bount.id} bounty={bount} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BountiesBrowsePage));
