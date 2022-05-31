const init = { auth: false, userName: '', loggedUserData: {} };

export const userReducer = (state = init, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, auth: true };
    }
    case 'LOGOUT': {
      return { ...state, auth: false };
    }
    case 'SET_USER_DATA': {
      console.log(action.payload);
      return { ...state, loggedUserData: action.payload };
    }
    default:
      return state;
  }
};
