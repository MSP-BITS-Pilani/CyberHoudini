import React, { Component } from 'react';
import './register.css';
import { Button } from 'shards-react';
import { withRouter } from 'react-router-dom';
import { authUrl } from '../../url';
import LoginModal from './loginModalComponent';
import JoinModal from './joinModalComponent';
import CreateModal from './createModalComponent';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModalOpen: false,
      joinModalOpen: false,
      createModalOpen: false
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

export default withRouter(Register);