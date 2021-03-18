import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Form, Button, FormInput, FormGroup } from 'shards-react';
import axios from 'axios';
import baseUrl from '../../baseUrl';

class JoinModal extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      referralInput: ''
    }
  }

  handleReferralChange = (e) => {
    console.log(e.target.value);
    this.setState({
      referralInput: e.target.value
    });
  };

  joinTeam = async(code) => {
    const cookies = document.cookie.split('; ');
    const value = cookies.find(item => item.startsWith('jwt')).split('=')[1];
    try{
        const response = await axios({
            url: baseUrl + '/teams/register/usingrc?reffCode=' + code,
            method: 'post',
            headers: {
              Authorization: `Bearer ${value}`
            }
            });
        if(response.status === 200 || response.status === 201) {
          alert("You are now a part of the team");
          window.location.reload();
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    } 
    catch(error) {
        alert("Team could not be joined." + error.message);
    };
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    const code = this.state.referralInput.trim();
    this.joinTeam(code);
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
              <label className = "join-label" htmlFor="#referralcode">Enter referral code</label>
              <FormInput 
                id="#referralcode" 
                placeholder="Code shared by team admin" 
                autoComplete = "off"
                onChange = {this.handleReferralChange} 
                value = {this.state.referralInput}
                required/>
            </FormGroup>
            <FormGroup>
              <Button type = "submit" onClick = {this.handleSubmit}>Join team</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    )
  }

}

export default JoinModal;