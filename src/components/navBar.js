import React, { Component } from 'react';
import { Form, Segment, Image } from 'semantic-ui-react';
import logo from '../logo.png';

const segmentStyle = {
  background: "#031229"
}

const imageStyle = {
  maxWidth: 50,
  marginLeft: "auto",
  marginRight: "auto",
}

class NavBar extends Component{
  constructor(){
    super();
    this.state = {
      searchText: ""
    }
  }


  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.searchText)
  }

  render(){
    return(
      <span>
        <Image src={logo} style={imageStyle} />
        <Form size='large' onSubmit={ this.onFormSubmit }>
          <Segment stacked style={segmentStyle}>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={
                e => { this.setState({username: e.target.value})}
              }/>
          </Segment>
        </Form>
      </span>
    );
  }
}

export default NavBar;
