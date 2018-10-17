import moment from 'moment';

const normalize = (formatDate, repo) => obj => {
  if (!obj) return null;
  const { date } = obj.commit.author;
  const user = obj.author || obj.committer || {};
  const id = obj.sha;
  const number = String(id).slice(0, 7);
  return {
    author: {
      avatar: user.avatar_url,
      name: user.login,
      url: user.url,
    },
    comments: obj.commit.comment_count,
    content: obj.commit.message,
    date,
    datefrom: moment(date).fromNow(),
    humandate: formatDate(date),
    icon: 'git-commit',
    id,
    number,
    repo,
    title: null,
    type: 'commit',
    url: obj.html_url,
  };
};

export default normalize;
