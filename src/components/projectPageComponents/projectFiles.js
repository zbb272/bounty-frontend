import React, { Component } from 'react';
import { Segment, Icon } from 'semantic-ui-react';
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

class ProjectFiles extends Component{

  render(){
    return(
      <div>
        <Segment>
          <p><a href={`https://github.com/${this.props.currentProject.github_url}`} alt="medium blogs" target="_blank" rel="noopener noreferrer">Link to Github Repository of Project</a></p>
          <Segment>
            <a href={`https://github.com/${this.props.currentProject.github_url}`} alt="medium blogs" target="_blank" rel="noopener noreferrer">
            <Icon name="github" size="massive"/>
            </a>
          </Segment>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentProject: store.currentProject,
})

export default withRouter(connect(mapStateToProps)(ProjectFiles));
