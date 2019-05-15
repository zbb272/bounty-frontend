import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import LoginHeader from '../components/loginPageComponents/loginHeader';
import LoginForm from '../components/loginPageComponents/loginForm';
import LoginFooter from '../components/loginPageComponents/loginFooter';

const loginFormStyle = {
  height: "100%",
  marginTop: "25%",
}

class LoginPage extends Component {
  render(){
    return(
      <div>
        { this.props.userAuthenticated ?
        <Redirect to={{
          pathname: "/dashboard"
        }}/>
        :
        <div className='login-form' style={loginFormStyle}>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <LoginHeader />
              <LoginForm />
              <LoginFooter />
            </Grid.Column>
          </Grid>
        </div>
        }
      </div>

    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  userAuthenticated: store.userAuthenticated
})

export default withRouter(connect(mapStateToProps)(LoginPage));
