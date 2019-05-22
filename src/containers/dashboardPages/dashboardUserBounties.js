import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import {connect} from 'react-redux';
import BountyCardSmall from '../../components/bountyCardComponents/bountyCardSmall'
import { backgroundColor2 } from '../../style/theme'

class DashboardUserBounties extends Component {
  render(){
    return(
      <div className='user-information' >
      <Segment style={backgroundColor2}>
        {this.props.currentUser.bounties.map(bount => <BountyCardSmall bounty={bount}/> )}
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

export default connect(mapStateToProps)(DashboardUserBounties);
