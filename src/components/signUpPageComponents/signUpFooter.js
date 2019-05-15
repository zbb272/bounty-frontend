import React from 'react';
import { Message } from 'semantic-ui-react';

const SignUpFooter = () => {

  const footerStyle = {
    background: "#031229",
    marginTop: "20px",
    color: "#E1EDFF",
  }

  return(
    <Message style={footerStyle}>
      Have an account already? Login <a href='#'>here</a>
    </Message>
  );
}

export default SignUpFooter;
