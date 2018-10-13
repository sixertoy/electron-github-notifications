const keys = [
  'ON_LOGIN',
  'ON_LOGOUT',
  'ON_LOADING_START',
  'ON_LOADING_ERROR',
  'ON_LOADING_COMPLETED',
  'ON_REPOSITORIES_LOADED',
  'ON_NOTIFICATIONS_LOADED',
  'ON_REPOSITORY_SUBSCRIBE',
  'ON_REPOSITORY_UNSUBSCRIBE',
];

const appExtras = {
  // from redux-persist
  PERSIST_REHYDRATE: 'persist/REHYDRATE',
};

const appTypes = keys.reduce((acc, key) => ({ ...acc, [key]: key }), {});
const Types = Object.assign({}, appTypes, appExtras);

export default Types;
