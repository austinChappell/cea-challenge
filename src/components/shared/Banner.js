import React from 'react';

import CountDown from './CountDown';

const Banner = (props) => {
  const {
    group,
    nextEventTime,
  } = props;
  const startYear = new Date(group.created).getFullYear();
  return (
    <div className="Banner">
      <h1>
        {group.name}
      </h1>
      <h4>Devvin' it up since {startYear}</h4>
      <CountDown eventTime={nextEventTime} message={`Until the next ${group.name} MeetUp!`} />
    </div>
  );
};

export default Banner;
