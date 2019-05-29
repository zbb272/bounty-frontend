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
        {this.props.currentUser.bounties.map(bount => <BountyCardSmall key={bount.id} bounty={bount} project={this.props.currentProject}/> )}
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
  currentProject: store.currentProject,
})

export default connect(mapStateToProps)(DashboardUserBounties);
