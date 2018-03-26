import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import EventDetails from '../../components/pages/EventDetails';

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {
  generalReducer: {
    accessToken: 'fakeToken',
  },
  eventReducer: {
    selectedEvent: {},
  },
};

const props = {
  match: {
    params: {},
  },
};

describe('The Panel Component', () => {
  it('should render correctly', () => {
    const options = {
      context: {
        store: mockStore(initialState),
      },
    };
    const wrapper = shallow(<EventDetails {...props} />, options);
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
