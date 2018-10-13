import { combineReducers } from 'redux';

import './hooks';
import { loading } from './loading';
import { token, user } from './login';
import { watched, notifications, subscriptions } from './repositories';

export default combineReducers({
  loading,
  // repositories
  notifications,
  subscriptions,
  token,
  user,
  watched,
});
