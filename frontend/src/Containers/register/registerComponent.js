import React, { Component } from 'react';
import './register.css';
import { Button } from 'shards-react';

class Register extends Component {
  render() {
    return(
      <div className = "container">
        <br/>
        <div className = "row">
          <div className = "col-6">
            <h4>Create your own team</h4>
            <br/>
            <Button>Create</Button>
          </div>
          <div className = "col-6">
            <h4>Join an already existing team</h4>
            <br/>
            <Button>Join</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;