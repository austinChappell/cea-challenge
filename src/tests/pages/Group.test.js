import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import Group from '../../components/pages/Group';

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {
  generalReducer: {
    accessToken: 'fakeToken',
  },
};

const props = {
  history: [],
  match: {
    params: {},
  },
  selectEvent: () => {},
};

describe('The Group Component', () => {
  it('should render correctly', () => {
    const options = {
      context: {
        store: mockStore(initialState),
      },
    };
    const wrapper = shallow(<Group {...props} />, options);
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
