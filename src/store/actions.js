import constants from './constants';

const actions = {
  setAccessToken: (accessToken) => {
    const action = {
      type: constants.SET_ACCESS_TOKEN,
      accessToken,
    };
  },

  selectEvent: (selectedEvent) => {
    const action = {
      type: constants.SELECT_EVENT,
      selectedEvent,
    };
  },
};

export default actions;
