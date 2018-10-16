const normalize = formatDate => obj => {
  if (!obj) return null;
  const user = obj.user || {};
  const date = obj.updated_at;
  const icon = (obj.pull_request && 'git-pull-request') || 'issue-opened';
  const type = (obj.pull_request && 'pull_request') || 'issue';
  return {
    author: {
      avatar: user.avatar_url,
      name: user.login,
      url: user.url,
    },
    comments: obj.comments,
    content: obj.body,
    date,
    humandate: formatDate(date),
    icon,
    id: obj.id,
    title: obj.title,
    type,
    url: obj.html_url,
  };
};

export default normalize;
