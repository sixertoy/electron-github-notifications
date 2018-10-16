import { sortByDate } from '../helpers';
import { retrieveCommits, retrieveIssues } from './xhr';
import { onLoadingCompleted, onLoadingStart } from './loading';
import Types from './Types';

export const retrieveFlux = (channelid, page) => (dispatch, getState) => {
  const { channels, repositories } = getState();
  const channel = channels.find(obj => obj.id === channelid);
  const repos = repositories.filter(obj =>
    channel.repositories.includes(obj.id)
  );
  dispatch(onLoadingStart());
  const issues = retrieveIssues(repos, { page });
  const commits = retrieveCommits(repos, { page });
  return Promise.all([commits, issues])
    .then(arrays => {
      const payload = arrays.reduce((acc, arr) => [...acc, ...arr], []);
      dispatch(onLoadingCompleted());
      dispatch({
        payload: sortByDate(payload, false),
        type: Types.ON_NOTIFICATIONS_LOADED,
      });
    })
    .catch(err => console.log(err));
};

export default retrieveFlux;
