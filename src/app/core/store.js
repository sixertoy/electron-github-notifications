import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

// application
import reducers from '../reducers';
import { persistconfig } from './config';

const bindMiddleware = (middlewares = []) => applyMiddleware(...middlewares);

export const configure = (initialState = {}) => {
  const middlewares = [thunk];
  const persisted = persistReducer(persistconfig, reducers);
  const store = createStore(
    persisted,
    initialState,
    bindMiddleware(middlewares)
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configure;
