import React, { Component } from 'react';
import './register.css';
import { Button, Card, CardBody, CardHeader } from 'shards-react';
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
            <div className = "row home-row align-items-center text-center">
              <div className = "col-12 col-md-6">
                <Card className = "register-card">
                  <CardHeader className = "register-header">
                    <h4 className = "register-title">Create</h4>
                  </CardHeader>
                  <CardBody className = "register-body">
                    <p>Make your own team and take charge. Be the admin and lead your people to glory.</p>
                    {
                      document.cookie.split('; ').find(row => row.startsWith('jwt=')) === undefined ?  
                      <Button className = "home-register" onClick = {this.toggleLoginModal} >Create</Button>
                      :
                      <Button className = "home-register" onClick = {this.toggleCreateModal} >Create</Button>
                    }
                  </CardBody>
                </Card>
              </div>
              <div className = "col-12 col-md-6">
                <Card className = "register-card">
                  <CardHeader className = "register-header">
                    <h4 className = "register-title">Join</h4>
                  </CardHeader>
                  <CardBody className = "register-body">
                    <p>Join your friends in their bid to win it all. Ask the admin for team's referral code.</p>
                    {
                      document.cookie.split('; ').find(row => row.startsWith('jwt=')) === undefined ?  
                      <Button className = "home-register" onClick = {this.toggleLoginModal} >Join</Button>
                      :
                      <Button className = "home-register" onClick = {this.toggleJoinModal} >Join</Button>
                    }
                  </CardBody>
                </Card>
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