import { createSelector } from 'reselect';

const repositoriesSelector = state => state.repositories;

export const selectOrganisations = createSelector(
  repositoriesSelector,
  repos => {
    const included = [];
    return repos
      .map(({ owner }) => {
        const key = owner.id;
        if (included.includes(key)) return null;
        included.push(key);
        return { id: owner.id, name: owner.login, url: owner.html_url };
      })
      .filter(v => v);
  }
);

export default selectOrganisations;
