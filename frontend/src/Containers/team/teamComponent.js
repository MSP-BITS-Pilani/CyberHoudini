import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../baseUrl';
import { Card, CardBody, CardTitle, CardHeader, CardImg, Button } from 'shards-react';

class Team extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      teamData: {}
    }
  }

  deleteTeam = async() => {
    const cookies = document.cookie.split('; ');
    const value = cookies.find(item => item.startsWith('jwt')).split('=')[1];
    try{
        const response = await axios({
            url: baseUrl + '/teams',
            method: 'delete',
            headers: {
                Authorization: `Bearer ${value}`
            }
            });
        if(response.status === 200) {
          alert('team has been deleted.\n');
          window.location.replace(baseUrl);
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    } 
    catch(error) {
      alert("The team couldnt be deleted." + error.message);
    };
  }
  
  removeMember = async(email) => {
    const cookies = document.cookie.split('; ');
    const value = cookies.find(item => item.startsWith('jwt')).split('=')[1];
    try{
        const response = await axios({
            url: baseUrl + '/teams/remove?email=' + email,
            method: 'post',
            headers: {
                Authorization: `Bearer ${value}`
            }
            });
        if(response.status === 200) {
          alert('Player has been removed\n');
          this.fetchTeamInfo();
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    } 
    catch(error) {
        alert("The player couldnt be removed." + error.message);
    };
  }

  fetchTeamInfo = async() => {
    const cookies = document.cookie.split('; ');
    const value = cookies.find(item => item.startsWith('jwt')).split('=')[1];
    try{
        const response = await axios({
            url: baseUrl + '/teams',
            method: 'get',
            headers: {
                Authorization: `Bearer ${value}`
            }
            });
        if(response.status === 200) {
            console.log(response.data);
            this.setState({
              teamData: response.data
            });
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    } 
    catch(error) {
        alert("User info couldnt be fetched." + error.message);
    };
  }

  async componentDidMount() {
    if(this.props.loggedIn && (this.props.userData.team !== null)) {
      this.fetchTeamInfo();
    }
  }

  render(){
    if(this.props.loggedIn && (this.props.userData.team !== null)) {
      return(
        <div className = "container mt-3">
          <div className = "row">
             { this.state.teamData.team !== undefined ? 
                <div className = "col-12">
                  <h2>{this.state.teamData.team.teamName}</h2>
                  { this.state.teamData.team.adminID === this.props.userData.user._id ?
                    <h4>Referral code: {this.state.teamData.team.referralCode}</h4>
                    :
                    <h4>Only admin can share the referral code to add other members</h4>
                  }
                  <br/>
                  <div className = "row">
                    { this.state.teamData.members.map((player) => {
                      return(
                        <div className = "col-8 col-md-6 col-lg-3">
                          <Card _id = {player._id}>
                            <CardHeader>
                              { this.state.teamData.team.adminID === player._id ?
                                'Admin' : 'Member' }
                            </CardHeader>
                            <CardImg src = {player.picture}></CardImg>
                            <CardBody>
                              <CardTitle>{player.name}</CardTitle>
                              <p>{player.email}</p>
                              { 
                                (this.state.teamData.team.adminID === this.props.userData.user._id) && (player._id !== this.state.teamData.team.adminID) ? 
                                <Button onClick={ () => { this.removeMember(player.email); } }>Remove from team</Button>
                                :
                                <span/>
                              }
                            </CardBody>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
              :
              <div/>
            }
          </div>
          <div className = "row mt-3 justify-content-center">
            <div className = "col-8 text-center">
              { this.state.teamData.team !== undefined ? 
                  this.state.teamData.team.adminID === this.props.userData.user._id ? 
                  <Button onClick = {this.deleteTeam}>Delete team</Button>
                  :
                  <Button>Exit from team</Button>
                :
                <div/>
              }
            </div>
          </div>
        </div>
      );
    }
    else {
      return(
        <Redirect to = "/404" />
      );
    }
  }
}

export default Team;