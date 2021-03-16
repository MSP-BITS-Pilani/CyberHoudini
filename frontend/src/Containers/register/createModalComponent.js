import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, FormSelect, Button } from 'shards-react';
import { authUrl } from '../../url';

class CreateModal extends Component {
  
  render() {
    return(
      <Modal open={this.props.modalVisible} toggle={this.props.toggleModal}>
        <ModalHeader>
          Create team
        </ModalHeader>
        <ModalBody>
          <p>Enter team code.</p>
          <Button className="modal-button">
            Create
          </Button>
        </ModalBody>
      </Modal>
    )
  }
}

export default CreateModal;