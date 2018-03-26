import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Home from '../../components/pages/Home';

const initialState = {
  generalReducer: {
    accessToken: 'fakeToken',
  },
};

const middlewares = [];
const mockStore = configureStore(middlewares);

const props = {
  location: {},
  setAccessToken: () => {},
};

describe('The Home Component', () => {
  it('should render correctly', () => {
    const options = {
      context: {
        store: mockStore(initialState),
      },
    };
    const wrapper = shallow(<Home {...props} />, options);
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
