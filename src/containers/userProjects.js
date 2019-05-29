import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import {connect} from 'react-redux';
import ProjectCardSmall from '../components/projectCardComponents/projectCardSmall'
import { backgroundColor2 } from '../style/theme'

const userInfoStyle = {
}

class UserProjects extends Component {
  render(){
    return(
      <div className='user-information' style={userInfoStyle}>
      <Segment style={backgroundColor2}>
        {this.props.targetUser.projects.map(proj => <ProjectCardSmall key={proj.id} project={proj}/> )}
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  targetUser: store.targetUser,
})

export default connect(mapStateToProps)(UserProjects);
