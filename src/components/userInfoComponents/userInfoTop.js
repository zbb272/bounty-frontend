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
    console.log(this.props)
    return(
      <div>
        <Segment>
          <h2>{this.props.currentUser.username}</h2>
          <p><Link to={"/login"}>Edit Profile</Link></p>
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

export default withRouter(connect(mapStateToProps)(UserInfoTop));
