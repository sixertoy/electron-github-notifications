import Client from '../core/client';
import { pipe, sortByDate } from '../helpers';
import { onLoadingCompleted, onLoadingStart } from './loading';
import Types from './Types';

const parseCommitsNotifications = items =>
  items.reduce((acc, entries) => {
    // eslint-disable-next-line
    const parsed = entries.data.map(({ commit, committer, html_url }) => ({
      title: null,
      url: html_url,
      content: commit.message,
      data: commit.author.date,
      author: {
        url: committer.url,
        name: committer.login,
        avatar: committer.avatar_url,
      },
    }));
    return [...acc, ...parsed];
  }, []);

const parseIssuesNotifications = items =>
  items.reduce((acc, entries) => {
    const parsed = entries.data.map(obj => ({
      title: obj.title,
      url: obj.html_url,
      content: obj.body,
      data: obj.updated_at,
      author: {
        url: obj.user.url,
        name: obj.user.login,
        avatar: obj.user.avatar_url,
      },
    }));
    return [...acc, ...parsed];
  }, []);

const addNotificationType = type => items =>
  items.map(obj => ({ ...obj, type }));

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
      const parsedIssues = pipe(
        parseIssuesNotifications,
        addNotificationType('issue')
      )(issues);
      const parsedCommits = pipe(
        parseCommitsNotifications,
        addNotificationType('commit')
      )(commits);
      let payload = [...parsedIssues, ...parsedCommits];
      payload = sortByDate(payload);
      dispatch(onLoadingCompleted());
      dispatch({
        payload,
        type: Types.ON_NOTIFICATIONS_LOADED,
      });
    })
    .catch(err => console.log(err));
};

export default retrieveFlux;
