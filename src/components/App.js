import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Api from '../api/api';
import store from '../store/reducers/';

import EventDetails from './EventDetails';
import Home from './Home';

const api = new Api();

const { authorize, getMeetupData } = api;

class App extends Component {
  // componentDidMount() {
  //   // getMeetupData('reactjs-dallas', this.printRes);
  // }

  // getData = () => {
  //   authorize('reactjs-dallas', this.printRes);
  // }

  // printRes = (results) => {
  //   console.log('RESPONSE', results)
  // }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/event_details" component={EventDetails} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </Provider>


        {/* <a href={`https://secure.meetup.com/oauth2/authorize?client_id=${process.env.REACT_APP_MEETUP_CONSUMER_KEY}&response_type=token&redirect_uri=${process.env.REACT_APP_MEETUP_REDIRECT_URI}`}>Authorize</a> */}
      </div>
    );
  }
}

export default App;
