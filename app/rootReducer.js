import {combineReducers} from 'redux';
import mainReducer from '../main/mainReducer';
import timePunchCardReducer from '../time_punch_card/timePunchCardReducer';
import userReducer from '../user/userReducer';

const rootReducer = combineReducers({
  main: mainReducer(),
  timePunchCard: timePunchCardReducer(),
  user: userReducer()
});

export default rootReducer;
