import moment from 'moment';

class HelperMethods {
  getTimerDisplay = (time) => {
    const days = moment(time).diff(Date.now(), 'days');
    const actualHours = moment(time).diff(Date.now(), 'hours');
    const actualMinutes = moment(time).diff(Date.now(), 'minutes');
    const actualSeconds = moment(time).diff(Date.now(), 'seconds');

    const hours = actualHours > 23 ? actualHours % 24 : actualHours;
    const minutes = actualMinutes > 59 ? actualMinutes % 60 : actualMinutes;
    const seconds = actualSeconds > 59 ? actualSeconds % 60 : actualSeconds;

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }
}

export default HelperMethods;