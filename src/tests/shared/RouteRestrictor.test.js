import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import RouteRestrictor from '../../components/shared/RouteRestrictor';

const initialState = {
  generalReducer: {
    accessToken: 'fakeToken',
  },
};

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('The RouteRestrictor Component', () => {
  it('should render correctly', () => {
    const options = {
      context: {
        store: mockStore(initialState),
      },
    };

    const wrapper = shallow(<RouteRestrictor />, options);
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
