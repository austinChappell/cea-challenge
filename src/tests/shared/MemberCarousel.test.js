import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import MemberCarousel from '../../components/shared/MemberCarousel';

const props = {
  members: [],
};

describe('The MemberCarousel Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<MemberCarousel {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
