import Client from '../../core/client';
import { sortByName } from '../../helpers';
import { onLoadingStart, onLoadingCompleted } from '../loading';
import Types from '../Types';

export const retrieveUserRepositories = () => dispatch => {
  dispatch(onLoadingStart());
  const opts = {};
  // const opts = { username: 'sixertoy', per_page: 100 };
  Client.fetch('users.get', opts)
    .then(({ data, status }) => {
      console.log('retrieveUserRepositories', data);
      // FIXME -> loading error
      if (status !== 200) return;
      dispatch(onLoadingCompleted());
      const items = sortByName(data);
      dispatch({ items, type: Types.ON_REPOSITORIES_LOADED });
    })
    .catch(err => console.log('err -> ', err));
};

export default retrieveUserRepositories;
