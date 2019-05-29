import React from 'react';
import { Icon, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserCardSmallSearch = (props) => {

  const bountyCardStyle = {

  }

  const progressBarStyle = {
  }

  let concatDescription = props.user.description;
  if(concatDescription === null){
    concatDescription = ""
  }
  if(concatDescription.length > 40){
    concatDescription = concatDescription.subString(0, 40);
  }
  return(
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Icon size="big" name="user circle"/>
          </Grid.Column>
          <Grid.Column width={7}>
            <h4><Link to={`/users/${props.user.id}`}>{props.user.username}</Link></h4>
            <p>Description: {concatDescription}...</p>
          </Grid.Column>
          <Grid.Column width={7}>
            <p>Worked on {props.user.bounties.length} bounties</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default UserCardSmallSearch;
