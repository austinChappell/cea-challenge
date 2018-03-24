import React from 'react';
import moment from 'moment';

import Card from './Card';

const Event = (props) => {
  const { event } = props;
  const {
    rsvp_limit: rsvpLimit,
    name,
    time,
    yes_rsvp_count: rsvp,
  } = event;
  return (
    <Card>
      <div className="Event">
        <h4>{name}</h4>
        <h6>{moment(time).format('MMMM Do YYYY, h:mm a')}</h6>
        <h6>{rsvp} going</h6>
        <h6>{rsvpLimit - rsvp} spots remaining</h6>
        <button>
          Learn More
        </button>
      </div>
    </Card>
  );
};

export default Event;
