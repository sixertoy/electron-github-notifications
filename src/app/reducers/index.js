import { combineReducers } from 'redux';

import './hooks';
import { channels } from './channels';
import { loading } from './loading';
import { token, user } from './login';
import { watched, repositories } from './repositories';

export default combineReducers({
  channels,
  loading,
  repositories,
  token,
  user,
  watched,
});
