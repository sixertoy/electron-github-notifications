import { combineReducers } from 'redux';

import { watched, subscriptions } from './repositories';

const minimized = (state = false, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const githubtoken = (state = null, action) => {
  switch (action.type) {
  case 'ON_STORE_GITHUB_TOKEN':
    return action.token;
  default:
    return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
  case 'ON_LOADING_START':
    return true;
  case 'ON_LOADING_ERROR':
  case 'ON_LOADING_COMPLETED':
    return false;
  default:
    return state;
  }
};

export default combineReducers({
  loading,
  minimized,
  githubtoken,
  // repositories
  watched,
  subscriptions,
});
