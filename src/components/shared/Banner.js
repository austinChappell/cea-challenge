import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CountDown from './CountDown';

const propTypes = {
  countDownMessage: PropTypes.string.isRequired,
  goBackButton: PropTypes.bool,
  goBackText: PropTypes.string,
  goBackRoute: PropTypes.string,
  nextEventTime: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

const defaultProps = {
  goBackButton: false,
  goBackText: null,
  goBackRoute: null,
  nextEventTime: null,
  subTitle: null,
  title: null,
};

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
        <Link to={goBackRoute} href={goBackRoute} >
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

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;

export default Banner;
