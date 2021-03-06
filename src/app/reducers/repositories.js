import Types from '../actions/Types';

export const watched = (state = [], action) => {
  switch (action.type) {
  case Types.ON_REPOSITORY_SUBSCRIBE:
    return [...state, action.id];
  case Types.ON_REPOSITORY_UNSUBSCRIBE:
    return state.filter(id => id !== action.id);
  default:
    return state;
  }
};

export const repositories = (state = [], action) => {
  switch (action.type) {
  case Types.ON_REPOSITORIES_LOADED:
    return action.payload.slice(0);
  default:
    return state;
  }
};
