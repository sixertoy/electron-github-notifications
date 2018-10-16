import Client from '../../core/client';
import { datetime } from '../../helpers';
import CommitNormalizer from '../normalizers/commits';
import parseNotifications from '../../utils/parseNotifications';

const DEFAULT_OPTIONS = {
  page: 0,
  per_page: 100,
};

export const retrieveCommits = (repositories, baseOptions = {}) => {
  const options = { ...DEFAULT_OPTIONS, ...baseOptions };
  const promises = repositories.map(obj => {
    const repo = obj.name;
    const owner = obj.owner.login;
    const opts = { ...options, owner, repo };
    return Client.fetch('repos.getCommits', opts);
  });
  return Promise.all(promises).then(commits =>
    parseNotifications(commits, CommitNormalizer(datetime))
  );
};

export default retrieveCommits;
