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

class ProjectInfoStats extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render(){
    let averageRating = 0;
    let numOfReviews = 0;
    this.props.currentProject.reviews.forEach(r => {
      averageRating += r.rating;
      numOfReviews += 1;
    })
    averageRating = averageRating / numOfReviews;
    let stars = [];
    for(let i = 1; i < 6; i++){
      if(averageRating > i){
        stars.push(<Icon key={i} name='star' />)
      }
      else{
        stars.push(<Icon key={i} name='star outline' />)
      }
    }
    return(
      <div style={statsStyle}>
        <Segment>
          <h2>Stats</h2>
          <p>{stars}({numOfReviews})</p>
          <p>Number of Bounties Posted: {(this.props.currentProject.bounties).length}</p>
          <p>Completed Bounties: {(this.props.currentProject.bounties.filter(b => b.status==="completed")).length}</p>
          <p>Poject Completion: {this.props.currentProject.progress}</p>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentProject: store.currentProject,
})

export default connect(mapStateToProps)(ProjectInfoStats);