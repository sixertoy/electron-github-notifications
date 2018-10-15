import { createSelector } from 'reselect';

const repositoriesSelector = state => state.repositories;

export const selectRepositories = createSelector(repositoriesSelector, repos =>
  repos.map(obj => {
    const icon =
      (obj.private && 'shield') || (obj.fork && 'repo-forked') || null;
    return { ...obj, icon };
  })
);

export default selectRepositories;
