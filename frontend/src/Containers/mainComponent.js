import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Home from "./home/homeComponent";
import Header from "./header/headerComponent";
import Register from "./register/registerComponent";
import Leaderboard from "./leaderboard/leaderboardComponent";

class Main extends Component {
  render() {
    return(
      <div>
        <Header />
        <Switch>
          <Route exact path = "/" component = {Home} />
          <Route path = "/register" component = {Register} />
          <Route path = "/event" component = {Home} />
          <Route path = "/leaderboard" component = {Leaderboard} />
          <Redirect to = "/" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);