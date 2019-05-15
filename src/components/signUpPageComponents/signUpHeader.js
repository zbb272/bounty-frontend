import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import logo from '../../logo.png';

const SignUpHeader = () => {
  const imageStyle = {
    maxWidth: 75,
    marginLeft: "auto",
    marginRight: "auto",
  }

  const headerStyle = {
    color: "#E1EDFF",
    marginBottom: "10px",
  }

  return(
    <div>
      <Image src={logo} style={imageStyle} />
      <Header as='h2' style={headerStyle} textAlign='center'>
        Sign-up for Bounty
      </Header>
    </div>
  );
}

export default SignUpHeader;
