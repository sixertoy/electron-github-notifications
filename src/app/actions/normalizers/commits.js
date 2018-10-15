const normalize = obj =>
  obj && {
    author:
      (obj.committer && {
        avatar: obj.committer.avatar_url,
        name: obj.committer.login,
        url: obj.committer.url,
      }) ||
      {},
    comments: obj.commit.comment_count,
    content: obj.commit.message,
    date: obj.commit.author.date,
    id: obj.sha,
    title: null,
    type: 'commit',
    url: obj.html_url,
  };

export default normalize;
