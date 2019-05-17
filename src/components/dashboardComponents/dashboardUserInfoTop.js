import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"

const imageStyle = {
  maxWidth: 75,
  marginLeft: "auto",
  marginRight: "auto",
}

const headerStyle = {
  color: "#E1EDFF",
  marginBottom: "10px",
}

class DashboardUserInfoTop extends Component{

  render(){
    return(
      <div>
        <Segment>
          <h2>{this.props.currentUser.username}</h2>
          <p>Github: {this.props.currentUser.github_url}</p>
          <p>Description: {this.props.currentUser.description}</p>
          <p><Link to={`/users/${this.props.currentUser.id}/edit`}>Edit Profile</Link></p>
          <p>Current Balance: $0.00</p>
          <p><Link to={"/login"}>Transfer Funds</Link></p>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

export default withRouter(connect(mapStateToProps)(DashboardUserInfoTop));
