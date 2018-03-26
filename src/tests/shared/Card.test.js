import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Card from '../../components/shared/Card';

describe('The Card Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Card />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
