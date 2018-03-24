import React, { Component } from 'react';

import Api from '../api/api';

const api = new Api();

const { authorize, getMeetupData } = api;

class App extends Component {
  componentDidMount() {
    // getMeetupData('reactjs-dallas', this.printRes);
  }

  getData = () => {
    authorize('reactjs-dallas', this.printRes);
  }

  printRes = (results) => {
    console.log('RESPONSE', results)
  }

  render() {
    return (
      <div className="App">
        <a href={`https://secure.meetup.com/oauth2/authorize?client_id=${process.env.REACT_APP_MEETUP_CONSUMER_KEY}&response_type=token&redirect_uri=${process.env.REACT_APP_MEETUP_REDIRECT_URI}`}>Authorize</a>
      </div>
    );
  }
}

export default App;
