/**
 * Created by mak on 9/6/16.
 */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React, {Component} from "react";
import {render} from "react-dom";

class App extends Component {
  constructor() {
    super();
    this.ONE_SECOND = 1000;
    this.state = {seconds: 0};
    this.incrementTimerAndUpdateState = this.incrementTimerAndUpdateState.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.incrementTimerAndUpdateState, this.ONE_SECOND)
  }

  incrementTimerAndUpdateState() {
    this.setState({ seconds: 1 + this.state.seconds });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>I am living {this.state.seconds} seconds!</div>
    );
  }
}

render(<App/>, document.getElementById('app'));
