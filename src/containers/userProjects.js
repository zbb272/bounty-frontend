import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import {connect} from 'react-redux';
import ProjectCardSmall from '../components/projectCardComponents/projectCardSmall'

const userInfoStyle = {
}

class UserProjects extends Component {
  render(){
    return(
      <div className='user-information' style={userInfoStyle}>
      <Segment>
        {this.props.targetUser.projects.map(proj => <ProjectCardSmall project={proj}/> )}
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  targetUser: store.targetUser,
})

export default connect(mapStateToProps)(UserProjects);
