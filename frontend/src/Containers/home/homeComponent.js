import React, { Component } from 'react';
import './home.css';
import { Button } from 'shards-react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return(
      <div className = "container">
        <br/>
        <h4>Register for the online treasure hunt of the millenia by MLSA this apogee 21.</h4>
        <br/>
        <Button theme = "warning">
          <Link to = "/register">
            Register now
          </Link>
        </Button>
      </div>
    );
  }
}

export default Home;