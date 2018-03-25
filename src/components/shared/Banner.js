import React from 'react';

import CountDown from './CountDown';

const Banner = (props) => {
  const {
    countDownMessage,
    nextEventTime,
    subTitle,
    title,
  } = props;

  return (
    <div className="Banner">
      <h1>
        {title}
      </h1>
      <h4>{subTitle}</h4>
      <CountDown
        eventTime={nextEventTime}
        message={countDownMessage}
      />
    </div>
  );
};

export default Banner;
