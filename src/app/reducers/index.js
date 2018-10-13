import { combineReducers } from 'redux';

import { loading } from './loading';
import { token, user } from './login';
import { watched, notifications, subscriptions } from './repositories';
import './hooks';

export default combineReducers({
  loading,
  // repositories
  notifications,
  subscriptions,
  token,
  user,
  watched,
});
