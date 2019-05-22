import React, { Component } from 'react';
import { Icon, Grid, Segment, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import {ownerCompleteBounty, ownerCancelBounty} from '../../redux/actionCreators';
import {connect} from 'react-redux';

class BountyCardProjectOwnerPending extends Component {
  constructor(props){
    super(props)
  }

  completeButtonEventHandler = (event) => {
    this.props.ownerCompleteBounty(this.props.currentBounty);
  }

  cancelButtonEventHandler = (event) => {
    if(window.confirm("If you cancel the bounty at this stage you will lose your deposit. Press OK to confirm.")){
      this.props.ownerCancelBounty(this.props.currentBounty);
    }
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
              <p><Link to={`/users/${this.props.currentBounty.user.id}`}>username</Link></p>
              <p>*USER RATING HERE*</p>
            </Grid.Column>
            <Grid.Column width={7}>
            {this.props.currentBounty.status === "pending" ?
              <div>
                <Button onClick={this.completeButtonEventHandler} color='blue' fluid size='medium'>Complete</Button>
                <Button onClick={this.cancelButtonEventHandler} color='red' fluid size='medium'>Cancel</Button>
              </div>
              : null
            }
            </Grid.Column>
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
  ownerCompleteBounty: (bounty) => {dispatch( ownerCompleteBounty(bounty) )},
  ownerCancelBounty: (bounty) => {dispatch( ownerCancelBounty(bounty) )},
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BountyCardProjectOwnerPending));
