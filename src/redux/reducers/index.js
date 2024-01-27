import { combineReducers } from 'redux';
import { randomQuote } from './quote';

const rootReducer = combineReducers({
  randomQuote,
});

export default rootReducer;
