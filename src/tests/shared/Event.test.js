import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Event from '../../components/shared/Event';

const props = {
  event: {
    rsvp_limit: 40,
    name: 'ReactJs Dallas',
    time: 1522030848733,
    yes_rsvp_count: 40,
  },
  selectEvent: () => {},
};

describe('The Event Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Event {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
