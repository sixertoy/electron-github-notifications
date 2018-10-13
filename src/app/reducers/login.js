import Types from '../actions/Types';

export const token = (state = null, action) => {
  switch (action.type) {
  case Types.ON_LOGIN:
    return action.token;
  case Types.ON_LOGOUT:
    return null;
  default:
    return state;
  }
};

export const user = (state = null, action) => {
  switch (action.type) {
  case Types.ON_USER_LOADED:
    return action.user;
  case Types.ON_LOGOUT:
    return null;
  default:
    return state;
  }
};
