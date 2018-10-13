import { combineReducers } from 'redux';

import { loading } from './loading';
import { githubtoken } from './login';
import { watched, notifications, subscriptions } from './repositories';
import './hooks';

export default combineReducers({
  loading,
  githubtoken,
  // repositories
  watched,
  notifications,
  subscriptions,
});
