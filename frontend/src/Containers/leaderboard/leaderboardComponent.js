import React, { Component } from 'react';
import './leaderboard.css';
import { Button } from 'shards-react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import baseUrl from '../../baseUrl';

class Leaderboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      socket: undefined,
      lisa: []
    }
  }
  
  async componentDidMount() {
    const socket = io();
    this.setState({
      socket: socket
    });
    socket.on("updateLeaderBoard", data => {
      console.log(data);
      this.setState({
        lisa: data
      });
    })
    try{
      const response = await axios({
          url: baseUrl + '/questions/leaderboard',
          method: 'get'
          });
      if(response.status === 200) {
          console.log(response.data);
          this.setState({
            lisa: response.data 
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

  componentWillUnmount() {
    this.state.socket.close();
  }

  render() {
    return(
      <div className = "container">
        <ul>
          { this.state.lisa.map((team) => {
            return(
              <li>
                <h4>{team.teamName}</h4>
                <h6>{team.level}</h6>
                <h6>{team.score}</h6>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Leaderboard;