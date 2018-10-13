import Types from '../actions/Types';

export const subscriptions = (state = [], action) => {
  switch (action.type) {
  case Types.ON_REPOSITORY_SUBSCRIBE:
    return state.concat([action.item]);
  case Types.ON_REPOSITORY_UNSUBSCRIBE:
    return state.filter(o => o.id !== action.id);
  default:
    return state;
  }
};

export const watched = (state = [], action) => {
  switch (action.type) {
  case Types.ON_REPOSITORIES_LOADED:
    return action.items;
  default:
    return state;
  }
};

export const notifications = (state = [], action) => {
  switch (action.type) {
  case Types.ON_NOTIFICATIONS_LOADED:
    return action.items;
  default:
    return state;
  }
};
