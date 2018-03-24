const initialState = {
  userAccessToken: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return Object.assign({}, initialState, { userAccessToken: action.userAccessToken });
    default:
      return state;
  }
};

export default reducer;
