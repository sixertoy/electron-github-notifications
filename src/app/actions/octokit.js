import { sortByName, sortByUpdate } from '../helpers';
import { onLoadingStart, onLoadingCompleted } from './loading';

const octokit = require('@octokit/rest')();

export const authentificateUser = ({ githubtoken }) =>
  octokit.authenticate({
    type: 'token',
    token: githubtoken,
  });

export const storeGithubToken = token => ({
  token,
  type: 'ON_STORE_GITHUB_TOKEN',
});

export const retrieveUserNotifications = () => (dispatch, getState) => {
  authentificateUser(getState());
  dispatch(onLoadingStart());
  octokit.activity.getNotifications().then(({ status }) => {
    // FIXME -> loading error
    if (status !== 200) return;
    dispatch(onLoadingCompleted());
  });
};

export const retrieveRepositories = () => (dispatch, getState) => {
  authentificateUser(getState());
  dispatch(onLoadingStart());
  const opts = { per_page: 100 };
  octokit.activity.getWatchedRepos(opts).then(({ data, status }) => {
    // FIXME -> loading error
    if (status !== 200) return;
    dispatch(onLoadingCompleted());
    dispatch({
      items: sortByName(data),
      type: 'ON_REPOSITORIES_LOADED',
    });
  });
};

export const retrieveNotifications = () => (dispatch, getState) => {
  authentificateUser(getState());
  dispatch(onLoadingStart());
  const { subscriptions } = getState();
  const promises = subscriptions
    .map(o => ({ repo: o.name, owner: o.owner, per_page: 100 }))
    .map(o => octokit.activity.getNotificationsForUser(o));
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
      type: 'ON_NOTIFICATIONS_LOADED',
    });
  });
};
