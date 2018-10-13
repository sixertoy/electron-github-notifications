import { registerPosthook } from 'redux-hook-middleware';

import Types from '../actions/Types';
import OctokitClient from '../core/client';

registerPosthook(Types.ON_LOGIN, appStore => {
  const { token } = appStore.getState();
  OctokitClient.init(token);
});

registerPosthook(Types.ON_LOGOUT, () => {
  OctokitClient.clear();
});

registerPosthook(Types.PERSIST_REHYDRATE, appStore => {
  const { token } = appStore.getState();
  if (!token) return;
  OctokitClient.init(token);
});
