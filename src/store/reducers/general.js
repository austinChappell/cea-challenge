const initialState = {
  accessToken: 'ff6d9244375add0e9c7d4bb291d68e54',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return Object.assign({}, initialState, { accessToken: action.accessToken });
    default:
      return state;
  }
};

export default reducer;
