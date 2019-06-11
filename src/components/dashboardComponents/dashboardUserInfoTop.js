import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"

class DashboardUserInfoTop extends Component{

  render(){
    let currentBalance = 0;
    let bounts = this.props.currentUser.bounties.filter(b => b.status === "completed");
    bounts.forEach(b => currentBalance += b.amount);
    return(
      <div>
        <Segment>
          <h2>{this.props.currentUser.username}</h2>
          <p>Github: {this.props.currentUser.github_url}</p>
          <p>Description: {this.props.currentUser.description}</p>
          <p><Link to={`/users/${this.props.currentUser.id}/edit`}>Edit Profile</Link></p>
          <p>Current Balance: ${currentBalance}</p>
          <h4>User Tags: </h4>
          { this.props.currentUser.tags.map(tag => {
            return <Button key={tag.id} >{tag.name}</Button>
          })}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

export default withRouter(connect(mapStateToProps)(DashboardUserInfoTop));
