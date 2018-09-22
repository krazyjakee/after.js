import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '../../../build';
import './client.css';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore(window.__PRELOADED_STATE__);

ensureReady(routes).then(data =>
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <After data={data} routes={routes} />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
