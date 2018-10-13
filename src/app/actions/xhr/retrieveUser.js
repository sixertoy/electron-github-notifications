import Client from '../../core/client';
import { onLoadingStart, onLoadingCompleted } from '../loading';
// import Types from '../Types';

export const retrieveUser = () => dispatch => {
  dispatch(onLoadingStart());
  Client.fetch('user.get')
    .then(({ data, status }) => {
      console.log('data', data);
      // FIXME -> loading error
      if (status !== 200) return;
      dispatch(onLoadingCompleted());
      // dispatch({ items, type: Types.ON_REPOSITORIES_LOADED });
    })
    .catch(err => console.log('err -> ', err));
};

export default retrieveUser;
