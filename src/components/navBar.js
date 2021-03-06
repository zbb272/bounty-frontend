import React, { Component } from 'react';
import { Form, Image, Menu, Container, Icon } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import logo from '../logo.png';

const formStyle = {
  marginRight: 10,
  minWidth: 275,
  color: "black",
  backgroundColor: "#1b1c1d",
  marginLeft: 10,
  marginTop: 12,
  float: "right",
  position: "fixed",
  right: 65
}

const containerStyle = {
  minWidth: "100%"
}

const searchStyle = {
  maxHeight: 35,
}

const imageStyle = {
  maxWidth: 50,
  marginLeft: "auto",
  marginRight: "auto",
}

const menuStyle = {
  maxHeight: 60,
}

const accountButtonStyle = {
  color: "#E1EDFF",
  position: "fixed",
  right: 20,
  marginTop: 16,
  marginBottom: "auto",
}

const homeButtonStyle = {
  fontSize: 30,
  marginLeft: 3,
  fontFamily: "Courier",
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
    this.props.history.push(`/search/${this.state.searchText}`)
  }

  render(){
    return(
      <div>
        <Menu fixed='top' inverted style={menuStyle}>
          <Container style={containerStyle}>
            <Menu.Item as={Link} to="/dashboard" header>
              <Image src={logo} style={imageStyle} />
              <span style={homeButtonStyle}>Bounty</span>
            </Menu.Item>
            <Menu.Item as={Link} to="/bounties" >Bounties</Menu.Item>
            <Menu.Item as={Link} to="/projects" >Projects</Menu.Item>
            <Menu.Item as={Link} to="/projects/new" >Create New Project</Menu.Item>


            <Form size='large' onSubmit={ this.onFormSubmit } style={formStyle}>

                <Form.Input fluid icon='search' iconPosition='left' placeholder='Search' style={searchStyle} onChange={
                    e => { this.setState({searchText: e.target.value})}
                  }/>

            </Form>
            <Link to={"/logout"}>
              <Icon name="user circle" style={accountButtonStyle} size="big" />
            </Link>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default withRouter(NavBar);
