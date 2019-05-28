import React, { Component } from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { connect } from "react-redux"

const imageStyle = {
  maxWidth: 75,
  marginLeft: "auto",
  marginRight: "auto",
}

const statsStyle = {
  marginTop: 30,
}

class DashboardUserInfoStats extends Component {
  constructor(props){
    super(props);
    this.state = {
      reviews: [],
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/reviews")
      .then(res => res.json())
      .then(data => {
        let userBountyIds = this.props.currentUser.bounties.map(b => b.id);
        let userProjectIds = this.props.currentUser.projects.map(p => p.id);
        let newReviews = data.filter(review => {
          if(review.bounty !== null){
            return userBountyIds.includes(review.bounty.id)
          }
          if(review.project !== null){
            return userProjectIds.includes(review.project.id)
          }
          return false
        })
        this.setState({
          reviews: newReviews,
        })
      })
  }

  render(){
    let averageRating = 0;
    let numOfReviews = 0;
    this.state.reviews.forEach(r => {
      averageRating += r.rating;
      numOfReviews += 1;
    })
    averageRating = averageRating / numOfReviews;
    let stars = [];
    for(let i = 1; i < 6; i++){
      if(averageRating > i){
        stars.push(<Icon name='star' />)
      }
      else{
        stars.push(<Icon name='star outline' />)
      }
    }
    return(
      <div style={statsStyle}>
        <Segment>
          <h2>Stats</h2>
          <p>{stars}({numOfReviews})</p>
          <p>Number of Bounties Posted: {(this.props.currentUser.bounties).length}</p>
          <p>Bounties Completed: {(this.props.currentUser.bounties).length}</p>
          <p>Number of Projects: {(this.props.currentUser.projects).length}</p>
          <p>Projects Completed: {(this.props.currentUser.projects).filter(proj => proj.progress === 100).length}</p>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

export default connect(mapStateToProps)(DashboardUserInfoStats);
