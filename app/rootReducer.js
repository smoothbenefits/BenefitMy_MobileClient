import {combineReducers} from 'redux';
import mainReducer from '../main/mainReducer';
import timePunchCardReducer from '../time_punch_card/timePunchCardReducer';
import userReducer from '../user/userReducer';
import helpReducer from '../help/helpReducer';

const rootReducer = combineReducers({
  main: mainReducer(),
  timePunchCard: timePunchCardReducer(),
  user: userReducer(),
  help: helpReducer()
});

export default rootReducer;
