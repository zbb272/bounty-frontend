import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import {connect} from 'react-redux';
import BountyCardSmall from '../components/bountyCardComponents/bountyCardSmall'
import { backgroundColor2 } from '../style/theme'

const userInfoStyle = {
}

class UserBounties extends Component {
  render(){
    return(
      <div className='user-information' style={userInfoStyle}>
      <Segment style={backgroundColor2}>
        {this.props.targetUser.bounties.map(bount => <BountyCardSmall bounty={bount} project={this.props.currentProject} /> )}
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  targetUser: store.targetUser,
  currentProject: store.currentProject,
})

export default connect(mapStateToProps)(UserBounties);
