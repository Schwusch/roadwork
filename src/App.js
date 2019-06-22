import React from 'react';
import './App.css';
import Roadworks from './Roadworks.js';
import ApiKeyInput from './ApiKeyInput.js';
import { StateContext } from './StateContext.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.setContext = (newState) => this.setState(newState);
    this.state = {
      apiKey: "",
      clicked: {},
      setContext: this.setContext
    };
    
  }

  componentDidMount() {
    if (typeof(Storage) !== "undefined") {
      let savedState = null;
      try {
        savedState = JSON.parse(localStorage.state);
      } catch (error) {}
      this.setState(savedState || this.state);
    }
  }

  componentDidUpdate() {
    if (typeof(Storage) !== "undefined") {
      localStorage.state = JSON.stringify(this.state);
    }
  }

  render() {
    let comp;
    if (this.state.apiKey && this.state.apiKey.length === 32) {
      comp = <Roadworks/>;
    } else {
      comp = <ApiKeyInput/>;
    } 
    return (
      <div className="App">
        <header className="App-header">
          <StateContext.Provider value={this.state}>
            {comp}
          </StateContext.Provider>
        </header>
      </div>
    );
  }
}

export default App;
