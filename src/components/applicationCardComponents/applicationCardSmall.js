import React, { Component } from 'react';
import { Icon, Grid, Segment, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class ApplicationCardSmall extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Icon.Group size="big">
                <Icon name="circle outline"/>
              </Icon.Group>
            </Grid.Column>
            <Grid.Column width={7}>
              <p><Link to={`/users/${this.props.application.user_id}`}>username</Link></p>
              <p>*USER RATING HERE*</p>
            </Grid.Column>
            <Grid.Column width={7}>
            <Button color='blue' fluid size='medium'>
              Approve
            </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Segment>
              <p>{this.props.application.message}</p>
            </Segment>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentProject: store.currentProject,
  currentBounty: store.currentBounty,
})

const mapDispatchToProps = (dispatch) => ({
  // getProjectWithId: (projectId)=>{dispatch( getProjectWithId(projectId) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationCardSmall));
