const normalize = formatDate => obj => {
  if (!obj) return null;
  const user = obj.user || {};
  const date = obj.updated_at;
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
    icon: 'bug',
    id: obj.id,
    title: obj.title,
    type: 'issue',
    url: obj.html_url,
  };
};

export default normalize;
