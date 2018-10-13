import { persistStore, persistReducer } from 'redux-persist';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import hookMiddleware from 'redux-hook-middleware';

// application
import { persistconfig } from './config';
import reducers from '../reducers';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composeMiddleWares = () => {
  const middlewares = [hookMiddleware, thunk];
  const applied = applyMiddleware(...middlewares);
  const enhanced = composeEnhancers(applied);
  return enhanced;
};

export const configure = (initialState = {}) => {
  const middlewares = composeMiddleWares();
  const persisted = persistReducer(persistconfig, reducers);
  const store = createStore(persisted, initialState, middlewares);
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configure;
