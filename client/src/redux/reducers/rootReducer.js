import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { userReducer } from './userReducer';
console.log(userReducer);
export const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
});
