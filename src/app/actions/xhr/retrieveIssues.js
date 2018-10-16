const parsedIssues = parseNotifications(issues, IssueNormalizer(datetime));

const retrieveIssues = client => options => {
  const issuesPromises = options.map(opts => client.fetch('issues.get', opts));
  return Promise.all(issuesPromises);
};

export default retrieveIssues;
