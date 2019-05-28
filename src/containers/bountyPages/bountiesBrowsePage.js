import React, { Component } from 'react';
import { Grid, Icon, Segment, Menu, Form, Button, TextArea } from 'semantic-ui-react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import NavBar from '../../components/navBar'
import ProjectInformation from '../projectPages/projectInformation'
import BountyCardSmall from '../../components/bountyCardComponents/bountyCardSmall'
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
      highRatedBounties: [],
      highPayingBounties: [],
      randomBounties: [],
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/bounties")
      .then(res => res.json())
      .then(data => {
        let openBounties = [];
        let bountiesWithLowApplications = {};
        let highestPayingBounties = [];
        let randomBounties = {};
        data.forEach(bounty => {
          if(bounty.status === "open"){
            openBounties.push(bounty)
          }
        })
        openBounties.sort((a, b) => {
          return a.amount - b.amount
        })
        while(highestPayingBounties.length < 3 && openBounties.length > 0){
          highestPayingBounties.push(openBounties.pop())
        }

        this.setState({
          highPayingBounties: highestPayingBounties
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
                    <h2 style={{textAlign: "left"}}>Bounties from High Rated Projects</h2>
                      <Button style={{marginTop: 10}} color='blue' fluid size='large'>
                        Placeholder
                      </Button>
                  </Segment>
                </Segment>
                <Segment style={backgroundColor2}>
                  <Segment>
                    <h2 style={{textAlign: "left"}}>Highest Paying Bounties</h2>
                      {this.state.highPayingBounties.map(bount => {
                        return <BountyCardSmall bounty={bount} />
                      })}
                      <Button style={{marginTop: 10}} color='blue' fluid size='large'>
                        Placeholder
                      </Button>
                  </Segment>
                </Segment>
                <Segment style={backgroundColor2}>
                  <Segment>
                    <h2 style={{textAlign: "left"}}>Random Bounties</h2>
                      <Button style={{marginTop: 10}} color='blue' fluid size='large'>
                        Placeholder
                      </Button>
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
