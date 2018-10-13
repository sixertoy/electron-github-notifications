import Types from './Types';

export const subscribe = id => ({
  id,
  type: Types.ON_REPOSITORY_SUBSCRIBE,
});

export const unsubscribe = id => ({
  id,
  type: Types.ON_REPOSITORY_UNSUBSCRIBE,
});
