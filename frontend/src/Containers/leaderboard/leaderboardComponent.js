import React, { Component } from 'react';
import './leaderboard.css';
import { Button } from 'shards-react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

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