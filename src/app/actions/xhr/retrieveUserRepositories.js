import Client from '../../core/client';
import { sortByName } from '../../helpers';
import { onLoadingStart, onLoadingCompleted } from '../loading';
import Types from '../Types';

export const retrieveUserRepositories = () => dispatch => {
  dispatch(onLoadingStart());
  const opts = { username: 'sixertoy', per_page: 100 };
  Client.fetch('repos.getForUser', opts)
    .then(({ data, status }) => {
      // FIXME -> loading error
      if (status !== 200) return;
      dispatch(onLoadingCompleted());
      const payload = sortByName(data);
      dispatch({ payload, type: Types.ON_REPOSITORIES_LOADED });
    })
    .catch(err => console.log('err -> ', err));
};

export default retrieveUserRepositories;
