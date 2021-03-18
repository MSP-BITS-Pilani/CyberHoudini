import React, { Component } from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse
} from "shards-react";
import { NavLink, withRouter } from 'react-router-dom';
import {authUrl} from '../../url';
import './header.css';


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
    console.log(this.props);
    return (
      <Navbar type="dark" theme="light" expand="md">
        <NavbarBrand href="#">
          <NavLink to = "/" className = "head-brand">Cyber Houdini</NavLink>
        </NavbarBrand>
        <NavbarToggler className = "head-toggler" onClick={this.toggleNavbar} />
        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar className = "ml-auto">
            { document.cookie.split('; ').find(row => row.startsWith('jwt=')) === undefined ?  
              <NavItem className = "mt-4 mb-2 mt-md-0 mb-md-0">
                <a className = "mx-0 mx-md-3 head-link" href = {authUrl + "&state=" + this.props.location.pathname }>
                  Login
                </a>
              </NavItem>
              :
              <NavItem className = "mt-4 mb-2 mt-md-0 mb-md-0">
                <span className = "mx-0 mx-md-3 head-link" onClick= {this.props.logout} >Logout</span>
              </NavItem>
            }
            <NavItem className = "my-2 my-md-0">
              <NavLink className = "mx-0 mx-md-3 head-link" to="/leaderboard" >
                Leaderboard
              </NavLink>
            </NavItem>
            <NavItem className = "my-2 my-md-0">
              <NavLink className = "mx-0 mx-md-3 head-link" to="/register" >
                { this.props.loggedIn && (this.props.userData.team !== null) ? 'Dashboard' : 'Register'}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Header);