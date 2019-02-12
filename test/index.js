import { mountTree } from '../src/index';
import We from '../src/createElement';

class CounterButton{
  constructor(props) {
    this.props = props;
    this.state = {count: 0};
    setInterval(() => {
      this.setState({count: this.state.count + 1});
    });
  }

  setState(obj) {
    this.state = obj;
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
  mountTree(
    <CounterButton title="Hello React Rally!" />,
    document.getElementById('App'),
  );
});
