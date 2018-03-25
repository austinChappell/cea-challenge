import React from 'react';
import { Link } from 'react-router-dom';

import CountDown from './CountDown';

const Banner = (props) => {
  const {
    countDownMessage,
    goBackButton,
    goBackText,
    goBackRoute,
    nextEventTime,
    subTitle,
    title,
  } = props;

  const backButton = goBackButton ?
    (
      <span className="go-back">
        <Link to={goBackRoute}>
          {goBackText}
        </Link>
      </span>
    ) : null;


  return (
    <div className="Banner">
      {backButton}
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
