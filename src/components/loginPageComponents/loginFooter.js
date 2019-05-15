import React from 'react';
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react';

const LoginFooter = () => {

  const footerStyle = {
    background: "#031229",
    marginTop: "20px",
    color: "#E1EDFF",
  }

  return(
    <Message style={footerStyle}>
      New to Bounty? Create an account <Link to={"/signup"}>here</Link>
    </Message>
  );
}

export default LoginFooter;
