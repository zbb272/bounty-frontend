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

class ProjectInfo extends Component{

  render(){
    return(
      <div>
        <Segment>
          <h2>{this.props.currentProject.name}</h2>
          <p><Link to={`/projects/${this.props.currentProject.id}/edit`}>Edit Project Information</Link></p>
          <p>Project Owner:</p>
          <p><Link to={`/users/${this.props.currentProject.user.id}`}>{this.props.currentProject.user.username}</Link></p>
          <Segment>
          <p>Description: {this.props.currentProject.description}</p>
          </Segment>
          <p>Project Completion: {this.props.currentProject.progress}</p>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentProject: store.currentProject,
})

export default withRouter(connect(mapStateToProps)(ProjectInfo));