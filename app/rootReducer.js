import {combineReducers} from 'redux';
import timePunchCardReducer from '../time_punch_card/timePunchCardReducer';
import userReducer from '../user/userReducer';

const rootReducer = combineReducers({
  timePunchCard: timePunchCardReducer(),
  user: userReducer()
});

export default rootReducer;
