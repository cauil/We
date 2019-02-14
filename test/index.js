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

  componentWillMount() {
    console.log('***lifeCycle: componentWillMount for CounterButton');
  }

  componentWillUnmount() {
    console.log('***lifeCycle: componentWillUnmount for CounterButton');
  }

  componentWillUpdate() {
    console.log('***lifeCycle: componentWillUpdate for CounterButton');
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
const mountNode = document.querySelector('#mount');
const unmountNode = document.querySelector('#unmount');
const updateNode = document.querySelector('#update');
const root = document.getElementById('App');

mountNode.addEventListener('click', () => {
  We.render(
    <CounterButton title="Hello React!" />,
    document.getElementById('App'),
  );
});

unmountNode.addEventListener('click', () => {
    We.unmount(root);
});

updateNode.addEventListener('click', () => {
  We.render(
    <CounterButton title="updated Hello We!" test="test" />,
    root,
  );
});
