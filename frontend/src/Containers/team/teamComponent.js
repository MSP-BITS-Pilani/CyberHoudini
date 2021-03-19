import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../baseUrl';
import { Card, CardBody, CardTitle, CardHeader, CardImg, Button } from 'shards-react';
import "./team.css";
import { Link } from 'react-router-dom';

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
        <div className = "container mt-4">
          <div className = "row">
             { this.state.teamData.team !== undefined ? 
                <div className = "col-12">
                  <h1 className = "register-weather">{this.state.teamData.team.teamName}</h1>
                  { this.state.teamData.team.adminID === this.props.userData.user._id ?
                    <h6>Referral code: {this.state.teamData.team.referralCode}<br/>Share this with people you want to be in your team.</h6>
                    :
                    <h6>Only admin can share the referral code to add other members</h6>
                  }
                  <br/>
                  <div className = "row">
                    { this.state.teamData.members.map((player) => {
                      return(
                        <div className = "col-12 col-md-4 col-lg-3 mt-2 mt-md-0">
                          <Card _id = {player._id}>
                            <CardBody>
                              <div className = "row align-items-center">
                                <div className = "col-3 col-md-12 pr-0 pr-md-2 text-left text-md-center mb-0 mb-md-3">
                                  <img src = {player.picture} className = "team-picture" alt = "profile"/>
                                </div>
                                <div className = "col-9 col-md-12 pr-0 pr-md-2 text-left text-md-center">
                                  <h5>{player.name}</h5>
                                  <p>
                                    <span className = "register-team-name">{ this.state.teamData.team.adminID === player._id ? 'Admin' : 'Member' }</span>
                                    <br/>
                                    {player.email}
                                  </p>
                                  { 
                                    (this.state.teamData.team.adminID === this.props.userData.user._id) && (player._id !== this.state.teamData.team.adminID) ? 
                                    <Button className = "home-register" onClick={ () => { this.removeMember(player.email); } }>Remove from team</Button>
                                    :
                                    <span/>
                                  }
                                </div>
                              </div>
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
          <div className = "row mt-4 justify-content-center">
            <div className = "col-8 text-center">
              { this.state.teamData.team !== undefined ? 
                  this.state.teamData.team.adminID === this.props.userData.user._id ? 
                  <Button className = "home-register" onClick = {this.deleteTeam}>Delete team</Button>
                  :
                  <div/>
                :
                <div/>
              }
              &nbsp;
              <Link to = "/houdini">
                <Button className = "home-register mt-2 mb-4 mb-md-0 mt-md-0 ">Begin the game</Button>
              </Link>
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