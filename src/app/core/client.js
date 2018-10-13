import lget from 'lodash.get';

const octokit = require('@octokit/rest');

const OctokitClient = {
  __INSTANCE__: null,
  clear: () => {
    OctokitClient.__INSTANCE__ = null;
  },
  fetch: (path, opts = {}) => {
    try {
      return lget(OctokitClient.__INSTANCE__, path)(opts);
    } catch (err) {
      throw new Error('Octokit Client should be initalized first');
    }
  },
  hasInstance: () => {
    const instance = OctokitClient.__INSTANCE__;
    if (!instance) return false;
    return instance;
  },
  init: token => {
    if (OctokitClient.__INSTANCE__) return;
    OctokitClient.__INSTANCE__ = octokit({ debug: true });
    OctokitClient.__INSTANCE__.authenticate({ token, type: 'token' });
  },
};

export default OctokitClient;
