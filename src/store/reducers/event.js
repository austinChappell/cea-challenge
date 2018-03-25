const initialState = {
  selectedEvent: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_EVENT':
      return Object.assign({}, state, { selectedEvent: action.selectedEvent });
    default:
      return state;
  }
};

export default reducer;
