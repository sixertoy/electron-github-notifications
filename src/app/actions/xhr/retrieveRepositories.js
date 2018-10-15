import Client from '../../core/client';
import { onLoadingStart, onLoadingCompleted } from '../loading';
import Types from '../Types';

export const retrieveRepositories = () => dispatch => {
  dispatch(onLoadingStart());
  const opts = { per_page: 100, type: 'all', username: 'sixertoy' };
  Client.fetch('repos.getForUser', opts)
    .then(({ data, status }) => {
      // FIXME -> loading error
      if (status !== 200) throw new Error('Unable to load repositories');
      dispatch(onLoadingCompleted());
      dispatch({ payload: data, type: Types.ON_REPOSITORIES_LOADED });
    })
    .catch(err => console.log('err -> ', err));
};

export default retrieveRepositories;
