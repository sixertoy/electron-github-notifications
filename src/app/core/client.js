import lget from 'lodash.get';

const octokit = require('@octokit/rest');

let __INSTANCE__ = null;

const OctokitClient = {
  clear: () => {
    __INSTANCE__ = null;
  },
  fetch: (path, opts = {}) => {
    try {
      return lget(__INSTANCE__, path)(opts);
    } catch (err) {
      throw new Error('Octokit Client should be initalized first');
    }
  },
  init: token => {
    if (__INSTANCE__) return;
    __INSTANCE__ = octokit({ debug: true });
    __INSTANCE__.authenticate({ token, type: 'token' });
  },
};

export default OctokitClient;
