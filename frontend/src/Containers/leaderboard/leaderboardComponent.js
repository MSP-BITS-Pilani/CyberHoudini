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
    const socket = io("http://cyberhoudini.centralindia.cloudapp.azure.com:4000/");
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
        <div className = "row home-row align-items-center">
          <div className = "col-12 text-center">  
            <table className = "leader-table mt-3">
              <tr>
                <th>Position</th>
                <th className = "text-left">Team name</th>
                <th className = "text-left">Level cleared</th>
                <th>Score</th>
              </tr>
              {this.state.lisa.map((team,index) => {
                return(
                  <tr>
                    <td className = "text-left ">{index + 1}</td>
                    <td className = "text-left ">{team.teamName}</td>
                    <td className = "text-left ">{team.level}</td>
                    <td>{team.score}</td>
                  </tr>
                );
              })}
            </table>
            <p className = "mt-5 leader-header">The leaderboard shows the teams leading at any time. In case a team has the same score, one which solved 
              problems quicker will be placed above
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
