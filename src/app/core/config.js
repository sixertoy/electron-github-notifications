import storage from 'redux-persist/lib/storage';
import { Logger } from './logger';

export const nodenv = process.env.NODE_ENV;
export const appversion = process.env.REACT_APP_VERSION;

export const usedebug = () => nodenv === 'development';

export const persistconfig = {
  storage,
  key: 'localhost.github.notifications',
  whitelist: ['channels', 'lastchannel', 'token', 'user', 'watched'],
};

Logger.debug(`
  **** Admin Application Debug ****
  NODE_ENV => ${nodenv}
  REACT_APP_VERSION => ${appversion}
`);
