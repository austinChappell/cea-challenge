import moment from 'moment';

class HelperMethods {
  getTimerDisplay = (startTime, endTime) => {
    const days = moment(endTime).diff(startTime, 'days');
    const actualHours = moment(endTime).diff(startTime, 'hours');
    const actualMinutes = moment(endTime).diff(startTime, 'minutes');
    const actualSeconds = moment(endTime).diff(startTime, 'seconds');

    const hours = actualHours > 23 ? actualHours % 24 : actualHours;
    const minutes = actualMinutes > 59 ? actualMinutes % 60 : actualMinutes;
    const seconds = actualSeconds > 59 ? actualSeconds % 60 : actualSeconds;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
}

export default HelperMethods;
