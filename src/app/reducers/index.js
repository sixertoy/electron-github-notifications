import { combineReducers } from 'redux';

import './hooks';
import { channels, lastchannel } from './channels';
import { loading } from './loading';
import { token, user } from './login';
import { notifications } from './notifications';
import { watched, repositories } from './repositories';

export default combineReducers({
  channels,
  lastchannel,
  loading,
  notifications,
  repositories,
  token,
  user,
  watched,
});
