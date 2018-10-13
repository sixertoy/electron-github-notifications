import Types from '../actions/Types';

export const lastchannel = (state = '', action) => {
  switch (action.type) {
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
