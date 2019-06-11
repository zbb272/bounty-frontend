import React from 'react';
import { Icon, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const BountyCardSmallBrowse = (props) => {

  // gonna have to change some
  let projectName = props.bounty.project.name;
  if(projectName === undefined){
    projectName = "test"
  }

  return(
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Icon.Group size="big">
              <Icon name="circle outline"/>
              <Icon color="teal" name="shekel"/>
            </Icon.Group>
          </Grid.Column>
          <Grid.Column width={7}>
            <h4><Link to={`/projects/${props.bounty.project.id}/bounties/${props.bounty.id}`}>{props.bounty.title}</Link></h4>
            <div><Link to={`/projects/${props.bounty.project.id}`}>{projectName}</Link></div>
          </Grid.Column>
          <Grid.Column width={7}>
            <p>{props.bounty.status}</p>
            <p>${props.bounty.amount}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default BountyCardSmallBrowse;
