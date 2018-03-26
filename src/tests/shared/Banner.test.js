import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Banner from '../../components/shared/Banner';

const props = {
  countDownMessage: '',
  goBackButton: true,
  goBackText: '',
  goBackRoute: '',
  nextEventTime: new Date(1522030848733),
  subTitle: '',
  title: '',
};

describe('The Banner Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Banner {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
