import uniqBy from 'lodash.uniqby';

import { sortByDate } from '../helpers';
import { onLoadingCompleted, onLoadingStart } from './loading';
import { getBranchesCommits, getIssues } from './xhr';
import Types from './Types';

export const retrieveFlux = (channelid, config) => (dispatch, getState) => {
  const { channels, repositories } = getState();
  const channel = channels.find(obj => obj.id === channelid);
  const repos = repositories.filter(obj =>
    channel.repositories.includes(obj.id)
  );
  dispatch(onLoadingStart());
  const promises = [
    getIssues(repos, config),
    getBranchesCommits(repos, config),
  ];
  return Promise.all(promises)
    .then(arrays => {
      let payload = arrays.reduce(
        (acc, arr) => (arr && [...acc, ...arr]) || acc,
        []
      );
      payload = uniqBy(payload, 'id');
      payload = sortByDate(payload, false);
      dispatch(onLoadingCompleted());
      dispatch({
        payload,
        type: Types.ON_NOTIFICATIONS_LOADED,
      });
    })
    .catch(err => console.log(err));
};

export default retrieveFlux;
