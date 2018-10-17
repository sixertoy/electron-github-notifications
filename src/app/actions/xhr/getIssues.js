import Client from '../../core/client';
import { datetime } from '../../helpers';
import issueNormalizer from '../normalizers/issues';
// import parseNotifications from '../../utils/parseNotifications';

const DEFAULT_OPTIONS = {
  assignee: 'none',
  page: 0,
  per_page: 100,
  state: 'all',
};

export const getIssues = (repositories, config = {}) => {
  const options = { ...DEFAULT_OPTIONS, ...config };
  const promises = repositories.map(obj => {
    const repo = obj.name;
    const owner = obj.owner.login;
    const opts = { ...options, owner, repo };
    return Client.fetch('issues.getForRepo', opts).then(({ data, status }) => {
      if (status !== 200) {
        const msg = `${repo} Issues load error with status: ${status}`;
        throw new Error(msg);
      }
      const normalize = issueNormalizer(datetime, repo);
      return data.map(normalize);
    });
  });
  return Promise.all(promises).then(promise =>
    promise.reduce((acc, arr) => [...acc, ...arr], [])
  );
};

export default getIssues;
