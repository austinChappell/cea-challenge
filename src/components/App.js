import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store/reducers/';

import Group from './pages/Group';
import Home from './pages/Home';

class App extends Component {
  render() {
    console.log(process.env.NODE_ENV);
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/event_details" component={Group} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
