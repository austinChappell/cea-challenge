import React, { Component } from 'react';

import Card from './Card';

class MemberCarousel extends Component {
  state = {}
  render() {
    const { members } = this.props;
    console.log('members', members)
    return (
      <div className="MemberCarousel">
        <h4>RSVP:</h4>
        <div className="slider">
          {members.map((member, index) => {
            return (
              <Card>
                <div className="member" key={index}>
                  <div 
                    className="avatar"
                    style={{ backgroundImage: `url(${member.photo.thumb_link})` }}
                  />
                </div>
                <h6>{member.name}</h6>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }
}

export default MemberCarousel;