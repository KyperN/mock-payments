const init = { loading: false, loggedUser: '' };

export const appReducer = (state = init, action) => {
  switch (action.type) {
    case 'LOADING': {
      return { ...state, loading: true };
    }
    case 'LOADED': {
      return { ...state, loading: false };
    }
    case 'SET_USER': {
      return { ...state, loggedUser: action.payload };
    }
    default:
      return state;
  }
};
