import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SliderCarousel from '../../components/shared/SliderCarousel';

const props = {
  members: [],
};

describe('The SliderCarousel Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SliderCarousel {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
