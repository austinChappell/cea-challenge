import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CountDown from '../../components/shared/CountDown';

const props = {
  eventTime: 1522030848733,
  message: '',
};

describe('The CountDown Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CountDown {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
