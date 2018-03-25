import React, { Component, Fragment } from 'react';
import moment from 'moment';

import HelperMethods from '../../helpers/';

const helperMethods = new HelperMethods();

const { getTimerDisplay } = helperMethods;

class CountDown extends Component {
  state = {
    time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  componentDidMount() {
    this.startTimer();
  }

  getTime = () => {
    const { eventTime } = this.props;
    const time = getTimerDisplay(eventTime);
    this.setState({ time })
  }

  startTimer = () => {
    this.getTime();
    setInterval(() => {
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
            <h4>{isNaN(days) ? 0 : days}</h4>
            <span>Days</span>
          </div>
          <div className="time-block">
            <h4>{isNaN(hours) ? 0 : hours}</h4>
            <span>Hours</span>
          </div>
          <div className="time-block">
            <h4>{isNaN(minutes) ? 0 : minutes}</h4>
            <span>Minutes</span>
          </div>
          <div className="time-block">
            <h4>{isNaN(seconds) ? 0 : seconds}</h4>
            <span>Seconds</span>
          </div>
        </div>
        <h6>{message}</h6>
      </Fragment>
    )
  }
}

export default CountDown;