import Client from '../../core/client';
import { datetime } from '../../helpers';
import CommitIssues from '../normalizers/issues';
import parseNotifications from '../../utils/parseNotifications';

const DEFAULT_OPTIONS = {
  assignee: 'none',
  direction: 'asc',
  page: 0,
  per_page: 100,
  sort: 'updated',
  state: 'all',
};

export const retrieveIssues = (repositories, baseOptions = {}) => {
  const options = { ...DEFAULT_OPTIONS, ...baseOptions };
  const promises = repositories.map(obj => {
    const repo = obj.name;
    const owner = obj.owner.login;
    const opts = { ...options, owner, repo };
    return Client.fetch('issues.getForRepo', opts);
  });
  return Promise.all(promises).then(commits =>
    parseNotifications(commits, CommitIssues(datetime))
  );
};

export default retrieveIssues;
