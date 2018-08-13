export const loading = (state = false, action) => {
  switch (action.type) {
  case 'ON_LOADING_START':
    return true;
  case 'ON_LOADING_ERROR':
  case 'ON_LOADING_COMPLETED':
    return false;
  default:
    return state;
  }
};

export default loading;
