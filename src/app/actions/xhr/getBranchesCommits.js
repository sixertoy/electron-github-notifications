import Client from '../../core/client';
import { datetime } from '../../helpers';
import commitNormalizer from '../normalizers/commits';

const DEFAULT_OPTIONS = {
  page: 0,
  per_page: 20,
};

const flatten = arrays => arrays.reduce((acc, arr) => [...acc, ...arr], []);

const fetchBranchCommits = branches => {
  const promised = branches.map(opts =>
    Client.fetch('repos.getCommits', opts)
      .then(({ data, status }) => {
        if (status !== 200) {
          const msg = `${opts.repo} error status: ${status}`;
          throw new Error(msg);
        }
        const normalize = commitNormalizer(datetime, opts.repo, opts.sha);
        return data.map(normalize);
      })
      .catch(() => {
        console.log('fetchBranchCommits error with options', opts);
      })
  );
  return Promise.all(promised);
};

const fetchBranches = opts =>
  Client.fetch('repos.getBranches', opts)
    .then(({ data, status }) => {
      if (status !== 200) {
        const msg = `${opts.repo} error status: ${status}`;
        throw new Error(msg);
      }
      const options = data.map(({ name: sha }) => ({ ...opts, sha }));
      return options;
    })
    .catch(() => {
      console.log('fetchBranches error with options', opts);
    });

export const getBranchesCommits = (repositories, config = {}) => {
  const base = { ...DEFAULT_OPTIONS, ...config };
  const promised = repositories.map(obj => {
    const repo = obj.name;
    const owner = obj.owner.login;
    const opts = { ...base, owner, repo };
    return fetchBranches(opts).then(fetchBranchCommits);
  });
  return Promise.all(promised).then(commits => flatten(flatten(commits)));
};

export default getBranchesCommits;
