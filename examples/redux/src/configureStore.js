import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const configureStore = preloadedState => {
  let ext;
  if (typeof window != 'undefined') {
    ext =
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__();
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk),
    ext
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').rootReducer;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
