import { registerPosthook } from 'redux-hook-middleware';

import Types from '../../actions/Types';
import Client from '../../core/client';

registerPosthook(Types.PERSIST_REHYDRATE, store => {
  const { token } = store.getState();
  const hasInstance = Client.hasInstance();
  const shouldInitialize = !hasInstance && token;
  if (!shouldInitialize) return;
  Client.init(token);
});
