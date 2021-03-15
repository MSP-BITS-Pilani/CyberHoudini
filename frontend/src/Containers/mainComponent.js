import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Home from "./home/homeComponent";

class Main extends Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path = "/" component = {Home} />
          <Route path = "/register" component = {Home} />
          <Redirect to = "/" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);