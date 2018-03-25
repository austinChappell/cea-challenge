import { combineReducers, createStore } from 'redux';

import generalReducer from './general';
import eventReducer from './event';

const reducers = combineReducers({
  eventReducer,
  generalReducer,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
