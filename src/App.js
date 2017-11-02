import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.log(
      `${new Date().getMilliseconds()} - * Component did catch working`
    );
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

class ComponentA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reRendered: 'false'
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

  render() {
    console.log(`${new Date().getMilliseconds()} - * ComponentA Rendering`);
    return <div>I'm Component A</div>;
  }

  componentDidMount() {
    console.log(`${new Date().getMilliseconds()} - * ComponentA Did Mount`);
    console.log('---- Changing state in component A ----');
    this.setState({ reRendered: 'true' });
  }

  componentDidUpdate() {
    console.log(`${new Date().getMilliseconds()} - * ComponentA Did Update`);
  }
}

class ComponentB extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    console.log(
      `${new Date().getMilliseconds()} - > * ComponentB Constructing`
    );

    this.makeError = this.makeError.bind(this);
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

  makeError() {
    console.log(
      `${new Date().getMilliseconds()} - > * ComponentB Set hasError to True`
    );
    this.setState({ hasError: true });
  }

  render() {
    console.log(`${new Date().getMilliseconds()} - > * ComponentB Rendering`);
    if (this.state.hasError) {
      throw new Error('I crashed!');
    }
    return (
      <b>
        {this.props.someProps} <br />
        <small>See in your console</small>
        <br />
        <button onClick={this.makeError}>Make an error here !</button>
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
}

class App extends Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <ComponentA />
        </ErrorBoundary>
        <ErrorBoundary>
          <ComponentB someProps={'Im a prop of Component B'} />
        </ErrorBoundary>
      </div>
    );
  }
}
export default App;
