const normalize = obj => ({
  type: 'issue',
  id: obj.id,
  title: obj.title,
  url: obj.html_url,
  content: obj.body,
  date: obj.updated_at,
  comments: obj.comments,
  author: {
    url: obj.user.url,
    name: obj.user.login,
    avatar: obj.user.avatar_url,
  },
});

export default normalize;
