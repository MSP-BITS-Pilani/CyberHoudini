import React, { Component } from 'react';
import './home.css';
import { Button } from 'shards-react';
import { Link } from 'react-router-dom';
import MLSA from '../../assets/MLSA.png';

class Home extends Component {
  render() {
    return(
      <div className = "container">
        <div className = "row home-row align-items-center">
          <div className = "col-12 col-md-6 col-lg-8 text-center text-md-left">
            <h4>Register for the online treasure hunt of the millenia by MLSA this apogee 21.</h4>
            <br/>
            <Link to = "/register">
              <Button className = "home-register">
                Register now
              </Button>
            </Link>
          </div>
          <div className = "col-12 col-md-6 col-lg-4">
            <img className = "home-logo" src = {MLSA} alt = "MLSA logo" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;