import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"

class UserInfoTop extends Component{

  render(){
    let currentBalance = 0;
    if(this.props.targetUser.id === this.props.currentUser.id){
      let bounts = this.props.currentUser.bounties.filter(b => b.status === "completed");
      bounts.forEach(b => currentBalance += b.amount);
    }
    return(
      <div>
        <Segment>
          <h2>{this.props.targetUser.username}</h2>
          <p>Github: {this.props.targetUser.github_url}</p>
          <p>Description: {this.props.targetUser.description}</p>
          {this.props.targetUser.id === this.props.currentUser.id ?
            <React.Fragment>
            <p><Link to={"/edit"}>Edit Profile</Link></p>
            <p>Current Balance: ${currentBalance}</p>
            </React.Fragment>
            :
            null
          }
          <h4>User Tags: </h4>
          { this.props.targetUser.tags.map(tag => {
            return <Button>{tag.name}</Button>
          })}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
  targetUser: store.targetUser,
})

export default withRouter(connect(mapStateToProps)(UserInfoTop));
