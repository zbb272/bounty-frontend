import React from 'react';
import { Segment } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";

const bountyTopStyle = {
  textAlign: "left",
}

const ProjectFiles = (props) => {
  return(
    <div style={bountyTopStyle}>
      <Segment>
        <h1>{props.bountyObj.title}</h1>
        <h3>Bounty Value: {props.bountyObj.value}</h3>
        <p>Posted By: <a href={`http://localhost:3001/users/${props.bountyObj.project.user_id}`} alt="medium blogs" target="_blank" rel="noopener noreferrer">{props.projObj.user.username}</a></p>
        <p>Accepted by: {props.bountyObj.user === null ? "None" : props.bountyObj.user.username}</p>
        <Segment>
          <p>Description: {props.bountyObj.description}</p>
        </Segment>
      </Segment>
    </div>
  );
}

export default withRouter(ProjectFiles);
