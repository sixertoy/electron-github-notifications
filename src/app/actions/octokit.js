import { sortByName, sortByDate } from '../helpers';
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

export const retrieveNotifications = (repo, owner) => (dispatch, getState) => {
  authentificateUser(getState());
  dispatch(onLoadingStart());
  const opts = { repo, owner, per_page: 100 };
  octokit.activity.getNotificationsForUser(opts).then(({ data, status }) => {
    // FIXME -> loading error
    if (status !== 200) return;
    dispatch(onLoadingCompleted());
    dispatch({
      items: sortByDate(data),
      type: 'ON_NOTIFICATIONS_LOADED',
    });
  });
};
