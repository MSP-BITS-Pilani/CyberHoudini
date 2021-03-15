import React, { Component } from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse
} from "shards-react";
import { NavLink } from 'react-router-dom';
import {authUrl} from '../../url';


class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }


  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    return (
      <Navbar type="dark" theme="dark" expand="md">
        <NavbarBrand href="#">
          <NavLink to = "/">Cyber Houdini</NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar className = "ml-auto">
            { document.cookie.split('; ').find(row => row.startsWith('jwt=')) === undefined ?  
              <NavItem>
                <a className = "mx-2" href = {authUrl}>
                  Login
                </a>
              </NavItem>
              :
              <NavItem>
                Logout
              </NavItem>
            }
            <NavItem>
              <NavLink className = "mx-2" to="/leaderboard" >
                Leaderboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className = "mx-2" to="/register" >
                Register
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;