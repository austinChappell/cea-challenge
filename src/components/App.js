import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store/reducers/';

import EventDetails from './pages/EventDetails';
import Group from './pages/Group';
import Home from './pages/Home';

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/group/:groupName/event/:eventId" component={EventDetails} />
          <Route path="/group/:groupName" component={Group} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  </div>
);

export default App;
