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
      list: {}
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
        list: data
      });
    })
  }

  render() {
    return(
      <div className = "container">
        <ul>
          <li>leaderboard</li>
        </ul>
      </div>
    );
  }
}

export default Leaderboard;