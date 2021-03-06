import React, { Component } from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import ProjectInfo from '../../components/projectPageComponents/projectInfo'
import { backgroundColor2 } from '../../style/theme'

const projectInfoStyle = {
  marginLeft: 10,
}

class ProjectInformation extends Component {
  render(){
    return(
      <div className='project-information' style={projectInfoStyle}>
      <Segment style={backgroundColor2}>
        <Segment>
          <Icon name="folder open" size="massive" />
        </Segment>
        <ProjectInfo />
      </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  currentProject: store.currentProject,
})

export default withRouter(connect(mapStateToProps)(ProjectInformation));
