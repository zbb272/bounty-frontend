import React from 'react';
import { Icon, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserCardSmall = (props) => {

  const bountyCardStyle = {

  }

  const progressBarStyle = {
  }


  let stars = [];
  for(let i = 1; i < 6; i++){
    if(props.bounty.reviews[0] !== undefined && props.bounty.reviews[0].rating >= i){
      stars.push(<Icon name='star' />)
    }
    else{
      stars.push(<Icon name='star outline' />)
    }
  }
  return(
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Icon size="big" name="user circle"/>
          </Grid.Column>
          <Grid.Column width={7}>
            <h4><Link to={`/users/${props.bounty.user.id}`}>{props.bounty.user.username}</Link></h4>
            <div><Link to={`/projects/${props.bounty.project_id}/bounties/${props.bounty.id}`}>{props.bounty.title}</Link></div>
          </Grid.Column>
          <Grid.Column width={7}>
            <p>{props.bounty.status}</p>
            <p>{stars}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default UserCardSmall;
