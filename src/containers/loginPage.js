import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
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
      <div className='login-form' style={loginFormStyle}>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <LoginHeader />
            <LoginForm />
            <LoginFooter />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LoginPage;
