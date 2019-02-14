import We from '../src/We';

class CounterButton{
  constructor(props) {
    this.props = props;
    this.state = {count: 0};
    /*
    setInterval(() => {
      this.setState({count: this.state.count + 1});
    });
    */
  }

  setState(obj) {
    this.state = obj;
  }

  componentWillUnmount() {
    console.log('***lifeCycle: componentWillUnmount for CounterButton');
  }

  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        <div>Count: <span>{this.state.count}</span></div>
      </div>
    );
  }
}

window.addEventListener('click', () => {
  We.render(
    <CounterButton title="Hello React!" />,
    document.getElementById('App'),
  );
});
