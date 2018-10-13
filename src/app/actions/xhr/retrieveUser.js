import Types from '../Types';
import Client from '../../core/client';
import { onLoadingStart, onLoadingCompleted } from '../loading';

const onUserLoaded = user => ({
  user,
  type: Types.ON_USER_LOADED,
});

export const retrieveUser = () => dispatch => {
  dispatch(onLoadingStart());
  Client.fetch('users.get')
    .then(({ data, status }) => {
      dispatch(onUserLoaded(data));
      dispatch(onLoadingCompleted());
      if (status !== 200) return;
      console.log('data', data);
    })
    .catch(err => console.log('err -> ', err));
};

export default retrieveUser;
