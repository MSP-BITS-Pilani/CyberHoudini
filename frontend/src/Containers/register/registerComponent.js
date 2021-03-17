import React, { Component } from 'react';
import './register.css';
import { Button } from 'shards-react';
import { withRouter } from 'react-router-dom';
import LoginModal from './loginModalComponent';
import JoinModal from './joinModalComponent';
import CreateModal from './createModalComponent';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModalOpen: false,
      joinModalOpen: false,
      createModalOpen: false,
      userData: {}
    }
  }
  
  toggleJoinModal = () => {
    this.setState({
      joinModalOpen: !this.state.joinModalOpen
    });
  }

  toggleLoginModal = () => {
    this.setState({
      loginModalOpen: !this.state.loginModalOpen
    });
  }

  toggleCreateModal = () => {
    this.setState({
      createModalOpen: !this.state.createModalOpen
    });
  }

  render() {
    console.log(this.props);
    if(this.props.loggedIn && (this.props.userData.team !== null)) {
      return(
        <div className = "container">
          <div className = "row mt-3">
            <div className = "col-3">
              <img referrerPolicy = "no-referrer" src = {this.props.userData.user.picture} alt = "profile" />
            </div>
            <div className = "col-9">
              <h3>Welcome {this.props.userData.user.name}</h3>
              <h5>{this.props.userData.user.email}</h5>
            </div>
          </div>
          <div className = "row">
            <div className = "col-12">
              <p>You are part of the team {this.props.userData.team.teamName}. Visit the team page at 12 noon 20th March to access
              the competition link.</p>
              <Link to = {"/team"}>Visit team page</Link> 
            </div>
          </div>
        </div>
      );
    }
    
    else {
      return(
        <div>
          <div className = "container">
            <br/>
            <div className = "row">
              <div className = "col-6">
                <h4>Create your own team</h4>
                <br/>
                {
                  document.cookie.split('; ').find(row => row.startsWith('jwt=')) === undefined ?  
                  <Button onClick = {this.toggleLoginModal} >Create</Button>
                  :
                  <Button onClick = {this.toggleCreateModal} >Create</Button>
                }
              </div>
              <div className = "col-6">
                <h4>Join an already existing team</h4>
                <br/>
                {
                  document.cookie.split('; ').find(row => row.startsWith('jwt=')) === undefined ?  
                  <Button onClick = {this.toggleLoginModal} >Join</Button>
                  :
                  <Button onClick = {this.toggleJoinModal} >Join</Button>
                }
              </div>
            </div>
          </div>
          <LoginModal modalVisible = {this.state.loginModalOpen} toggleModal = {this.toggleLoginModal} url = {this.props.location.pathname} />
          <JoinModal modalVisible = {this.state.joinModalOpen} toggleModal = {this.toggleJoinModal} url = {this.props.location.pathname}  />
          <CreateModal modalVisible = {this.state.createModalOpen} toggleModal = {this.toggleCreateModal} url = {this.props.location.pathname}  />
        </div>
      );
    }
  }
}


export default withRouter(Register);