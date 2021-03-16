import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Home from "./home/homeComponent";
import Header from "./header/headerComponent";
import Register from "./register/registerComponent";
import Leaderboard from "./leaderboard/leaderboardComponent";
import * as loginCreators from '../Store/Actions/login';
import { connect } from 'react-redux';
import Quiz from "./quiz/quizComponent";

class Main extends Component {
  
  async componentDidMount() {
    if(document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))) {
      this.props.handleLogin();
    }
    return null;
  }

  render() {
    console.log(this.props);
    return(
      <div>
        <Header 
         loggedIn = {this.props.loginHandle}
         logout = {this.props.handleLogout}/>
        <Switch>
          <Route exact path = "/" component = {Home} />
          <Route path = "/register" component = {Register} />
          <Route path = "/event" component = {Home} />
          <Route path = "/leaderboard" component = {Leaderboard} />
          <Redirect to = "/" />
        </Switch>
        <Quiz />
      </div>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    handleLogin: () => dispatch(loginCreators.login()),
    handleLogout: () => dispatch(loginCreators.logout())
  }
}

const mapStatetoProps = state => {
  return {
    loginHandle: state.logStatus.loggedIn
  }
}

export default connect( mapStatetoProps, mapDispatchtoProps )(withRouter(Main));