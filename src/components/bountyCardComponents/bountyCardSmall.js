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
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Icon.Group size="big">
              <Icon name="circle outline"/>
              <Icon color="teal" name="dollar"/>
            </Icon.Group>
            <div><Link to="/login">{props.bounty.title}</Link></div>
            <div><Link to="/login">{props.bounty.project.name}</Link></div>
          </Grid.Column>
          <Grid.Column>
            <p>{props.bounty.status}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default BountyCardSmall;
