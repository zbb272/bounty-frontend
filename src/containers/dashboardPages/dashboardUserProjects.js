import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import {connect} from 'react-redux';
import ProjectCardSmall from '../../components/projectCardComponents/projectCardSmall'

const userInfoStyle = {
}

class DashboardUserProjects extends Component {
  render(){
    return(
      <div className='user-information' style={userInfoStyle}>
      <Segment>
        {this.props.currentUser.projects.map(proj => <ProjectCardSmall project={proj}/> )}
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

export default connect(mapStateToProps)(DashboardUserProjects);
