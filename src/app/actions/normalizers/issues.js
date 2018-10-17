import moment from 'moment';

const getIssueIconByState = state => {
  switch (state) {
  case 'open':
    return `issue-opened`;
  case 'closed':
    return `issue-closed`;
  case 'reopened':
    return `issue-reopened`;
  default:
    return 'bug';
  }
};

const normalize = (formatDate, repo) => obj => {
  if (!obj) return null;
  const { comments, id, state, title, number } = obj;
  const user = obj.user || {};
  const date = obj.updated_at;
  const isPullRequest = obj.pull_request || false;
  const type = (isPullRequest && 'pull_request') || 'issue';
  const icon =
    (isPullRequest && 'git-pull-request') || getIssueIconByState(state);
  return {
    author: {
      avatar: user.avatar_url,
      name: user.login,
      url: user.url,
    },
    comments,
    content: obj.body,
    date,
    datefrom: moment(date).fromNow(),
    humandate: formatDate(date),
    icon,
    id,
    number,
    repo,
    title,
    type,
    url: obj.html_url,
  };
};

export default normalize;
