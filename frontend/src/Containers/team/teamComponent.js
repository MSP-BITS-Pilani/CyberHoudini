import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../baseUrl';

class Team extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      teamData: {}
    }
  }
  
  fetchTeamInfo = async() => {
    const cookies = document.cookie.split('; ');
    const value = cookies.find(item => item.startsWith('jwt')).split('=')[1];
    try{
        const response = await axios({
            url: baseUrl + '/team',
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

  render(){
    if(this.props.loggedIn && (this.props.userData.team !== null)) {
      this.fetchTeamInfo();
      return(
        <div className = "container">
          <div className = "row">
            <div className = "col-12">
              <h2>ddd</h2>
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