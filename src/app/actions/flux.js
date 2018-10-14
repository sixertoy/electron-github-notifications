import { sortByDate } from '../helpers';
import { onLoadingCompleted, onLoadingStart } from './loading';
import Types from './Types';
import Client from '../core/client';
import IssueNormalizer from './normalizers/issues';
import CommitNormalizer from './normalizers/commits';

const parseNotifications = (items, normalizer) =>
  items.reduce((acc, entries) => {
    const parsed = entries.data.map(normalizer);
    return [...acc, ...parsed];
  }, []);

export const retrieveFlux = channelid => (dispatch, getState) => {
  const { channels, repositories } = getState();
  const channel = channels.find(obj => obj.id === channelid);
  const repos = repositories.filter(obj =>
    channel.repositories.includes(obj.id)
  );
  const options = repos.map(obj => ({
    owner: obj.owner.login,
    repo: obj.name,
  }));
  dispatch(onLoadingStart());
  const commitsPromises = options.map(opts =>
    Client.fetch('repos.getCommits', opts)
  );
  const issuesPromises = options.map(opts =>
    Client.fetch('issues.getForRepo', opts)
  );
  const promise = [Promise.all(commitsPromises), Promise.all(issuesPromises)];
  Promise.all(promise)
    .then(([commits, issues]) => {
      // FIXME -> loading error
      // const failed = results.filter(o => o.status !== 200);
      const parsedIssues = parseNotifications(issues, IssueNormalizer);
      const parsedCommits = parseNotifications(commits, CommitNormalizer);
      let payload = [...parsedIssues, ...parsedCommits];
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
