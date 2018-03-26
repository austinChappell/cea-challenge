import constants from './constants';

const actions = {
  setAccessToken: accessToken => ({
    type: constants.SET_ACCESS_TOKEN,
    accessToken,
  }),

  selectEvent: selectedEvent => ({
    type: constants.SELECT_EVENT,
    selectedEvent,
  }),
};

export default actions;
