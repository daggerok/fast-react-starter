/**
 * Created by mak on 9/6/16.
 */
class App extends React.Component {
  constructor() {
    super();
    this.ONE_SECOND = 1000;
    this.state = { seconds: 0 };
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
      <div>I'm living {this.state.seconds} seconds!</div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
