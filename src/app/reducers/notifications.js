import Types from '../actions/Types';

export const notifications = (state = [], action) => {
  switch (action.type) {
  case Types.ON_NOTIFICATIONS_LOADED:
    return [...action.payload];
  default:
    return state;
  }
};

export default notifications;
