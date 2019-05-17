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

class UserInfoTop extends Component{

  render(){
    return(
      <div>
        <Segment>
          <h2>{this.props.targetUser.username}</h2>
          <p>Github: {this.props.targetUser.github_url}</p>
          <p>Description: {this.props.targetUser.description}</p>
          {this.props.targetUser.id === this.props.currentUser.id ?
            <React.Fragment>
            <p><Link to={"/edit"}>Edit Profile</Link></p>
            <p>Current Balance: $0.00</p>
            <p><Link to={"/login"}>Transfer Funds</Link></p>
            </React.Fragment>
            :
            null
          }
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
