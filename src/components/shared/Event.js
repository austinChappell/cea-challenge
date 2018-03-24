import React from 'react';
import moment from 'moment';

import Card from './Card';

const Event = (props) => {
  const { event } = props;
  const {
    name,
    time,
  } = event;
  return (
    <Card>
      <div className="Event">
        <h4>{name}</h4>
        <h6>{moment(time).format('MMMM Do YYYY, h:mm a')}</h6>
      </div>
    </Card>
  );
};

export default Event;
