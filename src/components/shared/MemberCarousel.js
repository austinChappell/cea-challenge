import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

const propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class MemberCarousel extends Component {
  state = {}
  render() {
    const { members } = this.props;
    console.log('members', members);
    return (
      <div className="MemberCarousel">
        <h4>RSVP:</h4>
        <div className="slider">
          {members.map(member => (
            <Card key={member.id}>
              <div>
                <div className="member">
                  <div
                    className="avatar"
                    style={{ backgroundImage: `url(${member.photo.thumb_link})` }}
                  />
                </div>
                <h6>{member.name}</h6>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

MemberCarousel.propTypes = propTypes;

export default MemberCarousel;
