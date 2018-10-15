const normalize = obj => ({
  author: {
    avatar: obj.user.avatar_url,
    name: obj.user.login,
    url: obj.user.url,
  },
  comments: obj.comments,
  content: obj.body,
  date: obj.updated_at,
  id: obj.id,
  title: obj.title,
  type: 'issue',
  url: obj.html_url,
});

export default normalize;
