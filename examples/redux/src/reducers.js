import autodux from 'autodux';
import { combineReducers } from 'redux';

const dux = autodux({
  slice: 'counter',
  initial: {
    count: 0,
  },
  actions: {
    increment: state => {
      return {
        count: state.count + 1,
      };
    },
  },
});

export const actions = dux.actions;
export const rootReducer = combineReducers({
  counter: dux.reducer,
});
