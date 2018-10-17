import Client from '../../core/client';
import { datetime } from '../../helpers';
import commitNormalizer from '../normalizers/commits';
// import parseNotifications from '../../utils/parseNotifications';

const DEFAULT_OPTIONS = {
  page: 0,
  per_page: 100,
};

export const getCommits = (repositories, config = {}) => {
  const options = { ...DEFAULT_OPTIONS, ...config };
  const promises = repositories.map(obj => {
    const repo = obj.name;
    const owner = obj.owner.login;
    const opts = { ...options, owner, repo };
    return Client.fetch('repos.getCommits', opts).then(({ data, status }) => {
      if (status !== 200) {
        const msg = `${repo} Commits load error with status: ${status}`;
        throw new Error(msg);
      }
      const normalize = commitNormalizer(datetime, repo);
      return data.map(normalize);
    });
  });
  return Promise.all(promises).then(promise =>
    promise.reduce((acc, arr) => [...acc, ...arr], [])
  );
};

export default getCommits;
