import React from 'react';
import { Link } from 'react-router-dom'
import { Message } from 'semantic-ui-react';

const SignUpFooter = () => {

  const footerStyle = {
    background: "#031229",
    marginTop: "20px",
    color: "#E1EDFF",
  }

  return(
    <Message style={footerStyle}>
      Have an account already? Login <Link to={"/login"}>here</Link>
    </Message>
  );
}

export default SignUpFooter;
