import Types from './Types';

export const changeChannel = id => ({
  id,
  type: Types.ON_CHANNEL_CHANGE,
});

export const createChannel = channel => ({
  channel,
  type: Types.ON_CHANNEL_CREATE,
});

export const removeChannel = id => ({
  id,
  type: Types.ON_CHANNEL_REMOVE,
});
