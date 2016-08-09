import {combineReducers} from 'redux';
import timePunchCard from '../time_punch_card/timePunchCardReducer';

const rootReducer = combineReducers({
  timePunchCard: timePunchCard()
});

export default rootReducer;
