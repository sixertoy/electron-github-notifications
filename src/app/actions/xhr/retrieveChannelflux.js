import Client from '../../core/client';
import { sortByUpdate } from '../../helpers';
import { onLoadingStart, onLoadingCompleted } from '../loading';
import Types from '../Types';

export const retrieveChannelFlux = () => (dispatch, getState) => {
  const { repositories } = getState();
  dispatch(onLoadingStart());
  const promises = repositories
    .map(o => ({ repo: o.name, owner: o.owner, per_page: 20 }))
    .map(o => Client.fetch('activity.getNotificationsForUser', o));
  Promise.all(promises).then(results => {
    // const failed = results.filter(o => o.status !== 200);
    // FIXME -> loading error
    const successed = results
      .filter(o => o.status === 200)
      .reduce((acc, o) => acc.concat(o.data), []);
    const sorted = sortByUpdate(successed);
    dispatch(onLoadingCompleted());
    dispatch({
      items: sorted,
      type: Types.ON_NOTIFICATIONS_LOADED,
    });
  });
};

export default retrieveChannelFlux;
