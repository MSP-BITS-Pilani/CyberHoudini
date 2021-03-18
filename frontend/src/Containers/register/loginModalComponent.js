import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, FormSelect, Button } from 'shards-react';
import { authUrl } from '../../url';

class LoginModal extends Component {
  
  render() {
    return(
      <Modal open={this.props.modalVisible} toggle={this.props.toggleModal}>
        <ModalHeader>
          Login/Sign in
        </ModalHeader>
        <ModalBody>
          <p>In order to be registered for the tournament, you must login with your gmail account.</p>
          <a href = {authUrl + "&state=" + this.props.url } onClick = {this.props.toggleModal}>
            <Button className="home-register">
              Login
            </Button>
          </a>
        </ModalBody>
      </Modal>
    )
  }
}

export default LoginModal;