import { combineReducers } from 'redux';

import { loading } from './loading';
import { watched, notifications, subscriptions } from './repositories';

const githubtoken = (state = null, action) => {
  switch (action.type) {
  case 'ON_STORE_GITHUB_TOKEN':
    return action.token;
  default:
    return state;
  }
};

export default combineReducers({
  loading,
  githubtoken,
  // repositories
  watched,
  notifications,
  subscriptions,
});
