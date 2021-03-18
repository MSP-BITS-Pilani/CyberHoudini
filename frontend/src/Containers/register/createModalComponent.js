import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Form, Button, FormInput, FormGroup } from 'shards-react';
import axios from 'axios';
import baseUrl from '../../baseUrl';

class CreateModal extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      teamNameInput: ''
    }
  }

  handleTeamnameChange = (e) => {
    console.log(e.target.value);
    this.setState({
      teamNameInput: e.target.value
    });
  };

  createTeam = async(teamname) => {
    const cookies = document.cookie.split('; ');
    const value = cookies.find(item => item.startsWith('jwt')).split('=')[1];
    try{
        const response = await axios({
            url: baseUrl + '/teams?teamName=' + teamname,
            method: 'post',
            headers: {
                Authorization: `Bearer ${value}`
            }
            });
        if(response.status === 200 || response.status === 201) {
          alert("The team has " + teamname + " been created.");
          window.location.reload();
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    } 
    catch(error) {
        alert("Team could not be created" + error.message);
    };
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    const teamname = this.state.teamNameInput.trim();
    this.createTeam(teamname);
  }

  render() {
    return(
      <Modal open={this.props.modalVisible} toggle={this.props.toggleModal}>
        <ModalHeader>
          Create team
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <label className = "create-label" htmlFor="#teamname">Enter team name</label>
              <FormInput 
                id="#teamname" 
                placeholder="Go creative" 
                autoComplete = "off"
                onChange = {this.handleTeamnameChange} 
                value = {this.state.teamNameInput}
                required/>
            </FormGroup>
            <FormGroup>
              <Button type = "submit" onClick = {this.handleSubmit}>Create team</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

export default CreateModal;