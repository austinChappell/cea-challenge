import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store/reducers/';

import EventDetails from './EventDetails';
import Home from './Home';

class App extends Component {
  render() {
    console.log(process.env.NODE_ENV);
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
      </div>
    );
  }
}

export default App;
