const initialState = {
  accessToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {...state, accessToken: action.payload};
    case 'LOGOUT':
      return {state, accessToken: null};
    default:
      return state;
  }
};
