import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import {connect} from 'react-redux';
import BountyCardSmall from '../components/bountyCardComponents/bountyCardSmall'

const userInfoStyle = {
}

class UserBounties extends Component {
  render(){
    return(
      <div className='user-information' style={userInfoStyle}>
      <Segment>
        {this.props.currentUser.bounties.map(bount => <BountyCardSmall bounty={bount}/> )}
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

export default connect(mapStateToProps)(UserBounties);
