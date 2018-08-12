import storage from 'redux-persist/lib/storage';
import { Logger } from './logger';

export const nodenv = process.env.NODE_ENV;
export const appversion = process.env.REACT_APP_VERSION;
export const serviceuri = process.env.REACT_APP_SERVICE_URI;

export const persistconfig = {
  key: 'localhost.github.notifications',
  storage,
  whitelist: ['githubtoken'],
};

export const usedebug = () => nodenv === 'development';

Logger.debug(`
  **** Admin Application Debug ****
  NODE_ENV => ${nodenv}
  REACT_APP_VERSION => ${appversion}
  REACT_APP_SERVICE_URI => ${serviceuri}
`);
