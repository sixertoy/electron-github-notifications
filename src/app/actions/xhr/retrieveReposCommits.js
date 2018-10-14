import Client from '../../core/client';
// import { sortByUpdate } from '../../helpers';
import { onLoadingStart, onLoadingCompleted } from '../loading';
// import Types from '../Types';

export const retrieveReposCommits = queries => dispatch => {
  dispatch(onLoadingStart());
  const promises = queries.map(o => Client.fetch('repos.getCommits', o));
  Promise.all(promises).then(data => {
    // const failed = results.filter(o => o.status !== 200);
    // FIXME -> loading error
    dispatch(onLoadingCompleted());
    console.log('data', data);
    // const successed = results
    //   .filter(o => o.status === 200)
    //   .reduce((acc, o) => acc.concat(o.data), []);
    // const sorted = sortByUpdate(successed);
    // dispatch(onLoadingCompleted());
    // dispatch({
    //   items: sorted,
    //   type: Types.ON_NOTIFICATIONS_LOADED,
    // });
  });
};

export default retrieveReposCommits;
