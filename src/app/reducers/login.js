import Types from '../actions/Types';

export const token = (state = null, action) => {
  switch (action.type) {
  case Types.ON_LOGIN:
    return action.token;
  case Types.ON_LOGOUT:
    return action.token;
  default:
    return state;
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
