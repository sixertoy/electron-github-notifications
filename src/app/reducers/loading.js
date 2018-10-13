import Types from '../actions/Types';

export const loading = (state = false, action) => {
  switch (action.type) {
  case Types.ON_LOADING_START:
    return true;
  case Types.ON_LOADING_ERROR:
  case Types.ON_LOADING_COMPLETED:
    return false;
  default:
    return state;
  }
};

export default loading;
