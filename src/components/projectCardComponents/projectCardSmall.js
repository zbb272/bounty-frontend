import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ProjectCardSmall = (props) => {

  const projectCardStyle = {

  }

  const progressBarStyle = {
  }

  return(
    <Segment>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Link to={`/projects/${props.project.id}`}>{props.project.name}</Link>
          </Grid.Column>
          <Grid.Column>
            <p style={progressBarStyle}>{props.project.progress}%</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default ProjectCardSmall;
