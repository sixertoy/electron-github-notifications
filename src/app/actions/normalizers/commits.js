const normalize = obj =>
  obj && {
    type: 'commit',
    id: obj.sha,
    title: null,
    url: obj.html_url,
    content: obj.commit.message,
    date: obj.commit.author.date,
    comments: obj.commit.comment_count,
    author:
      (obj.committer && {
        url: obj.committer.url,
        name: obj.committer.login,
        avatar: obj.committer.avatar_url,
      }) ||
      {},
  };

export default normalize;
