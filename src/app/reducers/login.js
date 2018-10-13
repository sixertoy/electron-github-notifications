import Types from '../actions/Types';

export const githubtoken = (state = null, action) => {
  switch (action.type) {
  case Types.ON_LOGIN:
    return action.token;
  case Types.ON_LOGOUT:
    return action.token;
  default:
    return state;
  }
};

export default githubtoken;
