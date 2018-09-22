import React from 'react';
import express from 'express';
import { render } from '../../../build';
import routes from './routes';

import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { renderToString } from 'react-dom/server';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const store = configureStore({ count: 0 });
    const serverState = store.getState();

    const customRenderer = node => {
      const App = <Provider store={store}>{node}</Provider>;
      return {
        html: renderToString(App),
        serverState,
      };
    };

    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        customRenderer,
      });
      res.send(html);
    } catch (error) {
      console.error(error);
      res.json({ message: error.message, stack: error.stack });
    }
  });

export default server;
