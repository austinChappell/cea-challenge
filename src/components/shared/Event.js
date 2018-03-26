import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import Card from './Card';

const propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  selectEvent: PropTypes.func.isRequired,
};

const Event = (props) => {
  const {
    event,
    selectEvent,
  } = props;
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
        <h6>{moment.tz(time, 'America/Chicago').format('MMMM Do YYYY, h:mm a')}</h6>
        <h6>{rsvp} going</h6>
        <h6>{rsvpLimit - rsvp} spots remaining</h6>
        <button onClick={() => selectEvent(event)}>
          Learn More
        </button>
      </div>
    </Card>
  );
};

Event.propTypes = propTypes;

export default Event;
