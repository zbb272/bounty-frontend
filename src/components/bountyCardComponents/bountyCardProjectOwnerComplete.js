import React, { Component } from 'react';
import { Icon, Grid, Segment, Button, TextArea } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { ownerReviewBounty} from '../../redux/actionCreators';
import {connect} from 'react-redux';

class BountyCardProjectOwnerComplete extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: "",
      rating: 1,
    }
  }

  ratingEventHandler = (event) => {
    console.log("rating ahndler click")
  }

  onSubmit = (event) => {
    let reviewObj = {
      message: this.state.message,
      rating: this.state.rating,
      user_id: this.props.currentUser.id,
      bounty_id: this.props.currentBounty.id
    }
    console.log(reviewObj)
    this.props.ownerReviewBounty(reviewObj)
  }

  render(){
    let starButtons = []
    for(let i = 1; i < 6; i++){
      if(i <= this.state.rating){
        starButtons.push(
          <Button onClick={(e) => this.setState({rating: i})}>
            <Icon name='star' />
          </Button>
        )
      }
      else{
        starButtons.push(
          <Button onClick={(e) => this.setState({rating: i})}>
            <Icon name='star outline' />
          </Button>
        )
      }
    }
    let userReview = this.props.currentUser.reviews.find(review => {
      return review.bounty_id === this.props.currentBounty.id
    })
    return(
      <Segment>
        <h2>Bounty has been fulfilled.</h2>
        {userReview === undefined ?
          <Segment>
            <h2>Leave a Review:</h2>
            <Button.Group icon>
              {starButtons}
            </Button.Group>
            <TextArea onChange={(e) => this.setState({message: e.target.value})} />
            <Button onClick={this.onSubmit} color='red' fluid size='medium'>Submit</Button>
          </Segment>
        :
          <Segment>
            <h3>Rating: {userReview.rating}</h3>
            <h4>{userReview.message}</h4>
          </Segment>
        }
      </Segment>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentProject: store.currentProject,
  currentBounty: store.currentBounty,
  currentUser: store.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  // getProjectWithId: (projectId)=>{dispatch( getProjectWithId(projectId) )},
  ownerReviewBounty: (review) => {dispatch( ownerReviewBounty(review) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BountyCardProjectOwnerComplete));
