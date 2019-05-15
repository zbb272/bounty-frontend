import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';

const SignUpForm = () => {

  const segmentStyle = {
    background: "#031229"
  }
  // whiteish grey:  "#E1EDFF"
  // light blue:     "#8DA2C0"
  // main color:     "#2C4870"
  // dark blue:      "#031229"
  // black:          "#000000"

  return(
    <Form size='large' >
      <Segment stacked style={segmentStyle}>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />
        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Confirm Password' type='password' />

        <Button color='blue' fluid size='large'>
          Create Account
        </Button>
      </Segment>
    </Form>
  );
}

export default SignUpForm;
