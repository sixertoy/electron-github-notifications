export const subscribe = item => ({
  item,
  type: 'ON_REPOSITORY_SUBSCRIBE',
});

export const unsubscribe = id => ({
  id,
  type: 'ON_REPOSITORY_UNSUBSCRIBE',
});
