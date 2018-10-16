import Types from '../actions/Types';

export const notifications = (state = [], action) => {
  switch (action.type) {
  case Types.ON_CHANNEL_CHANGE:
    return [];
  case Types.ON_NOTIFICATIONS_LOADED:
    return [...action.payload, ...state];
  default:
    return state;
  }
};

export default notifications;
