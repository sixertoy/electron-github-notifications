/* eslint no-console: 0 */
const usedebug = process.env.NODE_ENV === 'development';

const delegate = type => (...rest) => {
  if (!usedebug || !rest || rest.length < 1) return;
  const [msg, val] = rest;
  const args = [`[APP] ${msg}`, val].filter(v => v);
  console[type](...args);
};

const delegateDebug = () => (msg, val) => {
  // FIXME -> args length
  const css = 'background: #D19966; color: #FFFFFF';
  const args = [`%c${msg}`, css, val];
  delegate('log')(...args);
};

export const Logger = {
  // tricky console wrapper to get message stacks from
  // https://github.com/sixertoy/brackets-console-plus/blob/master/main.js#L417
  fixme: delegateDebug(),
  trace: delegateDebug(),
  debug: delegateDebug(),
  error: delegate('error'),
  log: delegate('log'),
  warn: delegate('warn'),
};

export default Logger;
