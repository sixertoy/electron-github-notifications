import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

// application
import './index.css';
import './app/core/init';
import { configure } from './app/core/store';
import { appversion, usedebug } from './app/core/config';

// components
import Main from './Main';

const { store, persistor } = configure();

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Main version={appversion} debug={usedebug()} />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
