import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'

const loginFormStyle = {
  height: "100%",
  marginTop: "25%",
}

class NewBountyPage extends Component {
  render(){
    return(
      <div>
        <h1>create new bounty page</h1>
      </div>

    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  // userAuthenticated: store.userAuthenticated
})

export default withRouter(connect(mapStateToProps)(NewBountyPage));
