const octokit = require('@octokit/rest')();

const onLoadingStart = () => ({
  type: 'ON_LOADING_START',
});

const onLoadingCompleted = () => ({
  type: 'ON_LOADING_COMPLETED',
});

export const storeGithubToken = token => ({
  token,
  type: 'ON_STORE_GITHUB_TOKEN',
});

export const authentificateUser = githubtoken =>
  octokit.authenticate({
    type: 'token',
    token: githubtoken,
  });

export const retrieveNotifications = () => dispatch => {
  dispatch(onLoadingStart());
  octokit.activity.getNotifications().then(result => {
    console.log('result', result);
    dispatch(onLoadingCompleted());
  });
};

export default retrieveNotifications;
