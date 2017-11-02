import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reRendered: 'false',
      someProps: 'React Lifecycle',
      hasError: false,
      lol: { lol: `I'm working` }
    };
    console.log(`${new Date().getMilliseconds()} - * ComponentA Constructing`);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(`${new Date().getMilliseconds()} - * ComponentA Will Update`);
  }

  componentWillMount() {
    console.log(`${new Date().getMilliseconds()} - * ComponentA Will Mount`);
  }

  componentWillUnmount() {
    console.log(`${new Date().getMilliseconds()} - * ComponentA Will Umount`);
  }

  makeError() {
    this.setState({ lol: null });
  }

  render() {
    console.log(`${new Date().getMilliseconds()} - * ComponentA Rendering`);
    if (this.state.hasError) {
      return <div>Sorry</div>;
    } else {
      return (
        <div>
          <ComponentB someProps={this.state.lol.lol} />
          <button onClick={this.makeError.bind(this)}>Make error</button>
        </div>
      );
    }
  }

  componentDidMount() {
    console.log(`${new Date().getMilliseconds()} - * ComponentA Did Mount`);
    console.log('---- Changing state in component A ----');
    this.setState({ reRendered: 'true' });
  }

  componentDidCatch(error, errorInfo) {
    console.log(`${new Date().getMilliseconds()} - * ComponentA Did Catch`);
    this.setState(state => ({ ...state, hasError: true }));
  }

  componentDidUpdate() {
    console.log(`${new Date().getMilliseconds()} - * ComponentA Did Update`);
  }
}

class ComponentB extends Component {
  constructor(props) {
    super(props);

    console.log(
      `${new Date().getMilliseconds()} - > * ComponentB Constructing`
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      `${new Date().getMilliseconds()} - > * ComponentB Will Receive Props`
    );
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(`${new Date().getMilliseconds()} - > * ComponentB Will Update`);
  }

  componentWillMount() {
    console.log(`${new Date().getMilliseconds()} - > * ComponentB Will Mount`);
  }

  componentWillUnmount() {
    console.log(`${new Date().getMilliseconds()} - > * ComponentB Will Umount`);
  }

  render() {
    console.log(`${new Date().getMilliseconds()} - > * ComponentB Rendering`);
    return (
      <b>
        {this.props.someProps} <br />
        <small>See in your console</small>
      </b>
    );
  }

  componentDidMount() {
    console.log(`${new Date().getMilliseconds()} - > * ComponentB Did Mount`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      `${new Date().getMilliseconds()} - > * ComponentB Should Update : Returning true`
    );
    return true;
  }

  componentDidUpdate() {
    console.log(`${new Date().getMilliseconds()} - > * ComponentB Did Update`);
  }

  componentDidCatch(error, errorInfo) {
    console.log(`${new Date().getMilliseconds()} - > * ComponentB Did Catch`);
  }
}

export default App;
