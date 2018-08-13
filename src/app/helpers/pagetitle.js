import { matchPath } from 'react-router';

export const pagetitle = (routes, pathname) => {
  const [match] = routes.filter(o => matchPath(pathname, o));
  return (match && match.title) || '';
};

export default pagetitle;
