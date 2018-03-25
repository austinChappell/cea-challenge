const initialState = {
  accessToken: 'asdf',
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
