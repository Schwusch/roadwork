import React from 'react';
import './App.css';
import Roadworks from '../Roadworks/Roadworks.js';
import ApiKeyInput from '../ApiKeyInput/ApiKeyInput.js';
import { StateContext } from '../../state/StateContext.js';
import { fetchRoadworks } from '../../api/roadwork-api.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setContext = newState => this.setState(newState);
    this.initialState = {
      apiKey: '',
      clicked: {},
      roadworks: [],
      setContext: this.setContext
    };
    this.state = this.initialState;
    this.fetchRoadworks = () => {
      if (this.state.apiKey.length === 32) {
        fetchRoadworks(this.state.apiKey).then(data =>
          this.setState({ roadworks: data })
        );
      }
    };
  }

  componentDidMount() {
    if (typeof Storage !== 'undefined') {
      let savedState = null;
      try {
        savedState = JSON.parse(localStorage.state);
      } catch (error) {}
      this.setState(savedState || this.state, this.fetchRoadworks);
    }
  }

  componentDidUpdate() {
    if (typeof Storage !== 'undefined') {
      localStorage.state = JSON.stringify(this.state);
    }
    if (this.state.roadworks.length === 0) {
      this.fetchRoadworks();
    }
  }

  render() {
    let comp;
    if (this.state.apiKey && this.state.apiKey.length === 32) {
      comp = (
        <div>
          <Roadworks />
          <h5
            onClick={() => {
              this.setState(this.initialState);
            }}
          >
            reset
          </h5>
        </div>
      );
    } else {
      comp = <ApiKeyInput />;
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
