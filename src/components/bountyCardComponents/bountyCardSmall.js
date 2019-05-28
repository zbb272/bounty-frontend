import React from 'react';
import { Icon, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const BountyCardSmall = (props) => {

  const bountyCardStyle = {

  }

  const progressBarStyle = {
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
            <h4><Link to={`/projects/${props.bounty.project_id}/bounties/${props.bounty.id}`}>{props.bounty.title}</Link></h4>
            <div><Link to={`/projects/${props.bounty.project_id}`}>{props.project.name}</Link></div>
          </Grid.Column>
          <Grid.Column width={7}>
            <p>{props.bounty.status}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default BountyCardSmall;
