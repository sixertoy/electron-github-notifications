import Types from '../actions/Types';

export const lastchannel = (state = null, action) => {
  switch (action.type) {
  case Types.ON_CHANNEL_CHANGE:
    return action.id;
  default:
    return state;
  }
};

export const channels = (state = [], action) => {
  switch (action.type) {
  case Types.ON_CHANNEL_CREATE:
    return [...state, action.channel];
  case Types.ON_CHANNEL_REMOVE:
    return state.filter(o => o.id !== action.id);
  default:
    return state;
  }
};
