import { registerPosthook } from 'redux-hook-middleware';

import Types from '../actions/Types';
import OctokitClient from '../core/client';

registerPosthook(Types.ON_LOGIN, appStore => {
  const { githubtoken } = appStore.getState();
  OctokitClient.init(githubtoken);
});

registerPosthook(Types.ON_LOGOUT, () => {
  OctokitClient.clear();
});

registerPosthook(Types.PERSIST_REHYDRATE, appStore => {
  const { githubtoken } = appStore.getState();
  if (!githubtoken) return;
  OctokitClient.init(githubtoken);
});
