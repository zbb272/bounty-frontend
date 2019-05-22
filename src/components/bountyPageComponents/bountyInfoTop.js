import React from 'react';
import { Segment } from 'semantic-ui-react';
import { withRouter, Link } from "react-router-dom";
import { backgroundColor1 } from '../../style/theme'

const bountyTopStyle = {
  textAlign: "left",
}

const ProjectFiles = (props) => {
  return(
    <div style={bountyTopStyle}>
      <Segment>
        <h1>{props.bountyObj.title}</h1>
        <h3>Bounty Value: ${props.bountyObj.amount}</h3>
        <p>Posted By: <Link to={`/users/${props.bountyObj.project.user_id}`}>{props.projObj.user.username}</Link></p>
        <p>Accepted by: {props.bountyObj.user === null ? "None" : <Link to={`/users/${props.bountyObj.user.id}`}>{props.bountyObj.user.username}</Link>}</p>
        <Segment style={backgroundColor1} >
          <p>Description: {props.bountyObj.description}</p>
        </Segment>
      </Segment>
    </div>
  );
}

export default withRouter(ProjectFiles);
