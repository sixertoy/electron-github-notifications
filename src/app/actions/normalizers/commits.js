const normalize = formatDate => obj => {
  if (!obj) return null;
  const { date } = obj.commit.author;
  const user = obj.author || obj.committer || {};
  return {
    author: {
      avatar: user.avatar_url,
      name: user.login,
      url: user.url,
    },
    comments: obj.commit.comment_count,
    content: obj.commit.message,
    date,
    humandate: formatDate(date),
    icon: 'git-commit',
    id: obj.sha,
    title: null,
    type: 'commit',
    url: obj.html_url,
  };
};

export default normalize;
