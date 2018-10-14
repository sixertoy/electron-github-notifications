// NOTE -> DEMO -> https://codesandbox.io/s/nwrz8pw424
export const each = (args, ...functions) =>
  functions.filter(v => v).map(fn => fn(...args));

export const compose = (...fns) =>
  fns
    .filter(v => v)
    .reverse()
    .reduce((prev, next) => value => next(prev(value)), value => value);

export const pipe = (...fns) => compose.apply(compose, fns.reverse());

export const noop = () => {};

export const noopnoop = v => v;
