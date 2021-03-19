import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Home from "./home/homeComponent";
import Header from "./header/headerComponent";
import Register from "./register/registerComponent";
import Leaderboard from "./leaderboard/leaderboardComponent";
import Team from "./team/teamComponent";
import NotFound from "./notfound/notFoundComponent";
import * as loginCreators from '../Store/Actions/login';
import { connect } from 'react-redux';
import Quiz from "./quiz/quizComponent";
import axios from 'axios';
import baseUrl from '../baseUrl';

class Main extends Component {

  async componentDidMount() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))) {
      const cookies = document.cookie.split('; ');
      const value = cookies.find(item => item.startsWith('jwt')).split('=')[1];
      try {
        const response = await axios({
          url: baseUrl + '/users',
          method: 'get',
          headers: {
            Authorization: `Bearer ${value}`
          }
        });
        if (response.status === 200) {
          console.log(response.data);
          this.props.handleLogin(response.data);
        }
        else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      }
      catch (error) {
        alert("User info couldnt be fetched." + error.message);
        this.props.handleLogout();
      };
    }
    return null;
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Header
          loggedIn={this.props.loginHandle}
          logout={this.props.handleLogout}
          userData={this.props.userData} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register">
            <Register userData={this.props.userData} loggedIn={this.props.loginHandle} />
          </Route>
          <Route path="/event" component={Home} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/team">
            <Team userData={this.props.userData} loggedIn={this.props.loginHandle} />
          </Route>
          <Route path="/404" component={NotFound} />
          <Route path="/houdini" component={Quiz} />
          <Redirect to="/404" />
        </Switch>



      </div>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    handleLogin: (user) => dispatch(loginCreators.login(user)),
    handleLogout: () => dispatch(loginCreators.logout())
  }
}

const mapStatetoProps = state => {
  return {
    loginHandle: state.logStatus.loggedIn,
    userData: state.logStatus.userData
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withRouter(Main));