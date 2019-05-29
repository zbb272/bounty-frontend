import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import {connect} from 'react-redux';
import ProjectCardSmall from '../../components/projectCardComponents/projectCardSmall'
import { backgroundColor2 } from '../../style/theme'


class DashboardUserProjects extends Component {
  render(){
    return(
      <div className='user-information'>
      <Segment style={backgroundColor2}>
        {this.props.currentUser.projects.map(proj => <ProjectCardSmall key={proj.id} project={proj}/> )}
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentUser: store.currentUser,
})

export default connect(mapStateToProps)(DashboardUserProjects);
