import Client from '../../core/client';
import { onLoadingStart, onLoadingCompleted } from '../loading';

export const retrieveUserNotifications = () => dispatch => {
  console.log('--> retrieveUserNotifications');
  dispatch(onLoadingStart());
  Client.fetch('activity.getNotifications').then(({ status }) => {
    // FIXME -> loading error
    if (status !== 200) return;
    dispatch(onLoadingCompleted());
  });
};

export default retrieveUserNotifications;
