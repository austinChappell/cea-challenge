import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import HelperMethods from '../../helpers/';

const helperMethods = new HelperMethods();

const { getTimerDisplay } = helperMethods;

const propTypes = {
  eventTime: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  message: PropTypes.string,
  startTime: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

const defaultProps = {
  eventTime: null,
  message: null,
  startTime: null,
};

class CountDown extends Component {
  state = {
    time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.stopTimer);
  }

  getTime = () => {
    const { eventTime, startTime } = this.props;
    const now = startTime || Date.now();
    const time = getTimerDisplay(now, eventTime);
    this.setState({ time });
  }

  startTimer = () => {
    this.getTime();
    this.stopTimer = setInterval(() => {
      this.getTime();
    }, 1000);
  }

  render() {
    const {
      days,
      hours,
      minutes,
      seconds,
    } = this.state.time;
    const { message } = this.props;

    return (
      <Fragment>
        <div className="CountDown">
          <div className="time-block">
            <h4>{Number.isNaN(days) ? '--' : days}</h4>
            <span>Days</span>
          </div>
          <div className="time-block">
            <h4>{Number.isNaN(hours) ? '--' : hours}</h4>
            <span>Hours</span>
          </div>
          <div className="time-block">
            <h4>{Number.isNaN(minutes) ? '--' : minutes}</h4>
            <span>Minutes</span>
          </div>
          <div className="time-block">
            <h4>{Number.isNaN(seconds) ? '--' : seconds}</h4>
            <span>Seconds</span>
          </div>
        </div>
        <h6>{message}</h6>
      </Fragment>
    );
  }
}

CountDown.propTypes = propTypes;
CountDown.defaultProps = defaultProps;

export default CountDown;
