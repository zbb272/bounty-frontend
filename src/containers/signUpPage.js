import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import SignUpHeader from '../components/signUpPageComponents/signUpHeader';
import SignUpForm from '../components/signUpPageComponents/signUpForm';
import SignUpFooter from '../components/signUpPageComponents/signUpFooter';

const signUpFormStyle = {
  height: "100%",
  marginTop: "25%",
}

class SignUpPage extends Component {
  render(){
    return(
      <div>
        { this.props.userAuthenticated ?
        <Redirect to={{
          pathname: "/dashboard"
        }}/>
        :
        <div className='sign-up-form' style={signUpFormStyle}>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <SignUpHeader />
              <SignUpForm />
              <SignUpFooter />
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

export default withRouter(connect(mapStateToProps)(SignUpPage));
