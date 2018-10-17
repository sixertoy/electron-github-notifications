import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ item }) => {
  const {
    author,
    branch,
    content,
    datefrom,
    humandate,
    icon,
    number,
    repo,
    title,
    url,
  } = item;
  const itemTitle = title || content;
  return (
    <div className="notification small is-white-background mt7 ml24 mr32 fs12 px12 py5 br4 shadow-bl">
      <div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="is-black-text no-underline is-italic mr5"
        >
          <i className={`icon-${icon} mr5`} />
          <span>
            #{repo}/{branch}/{number}
          </span>
        </a>
        <a href={author.url} className="no-underline is-black-link is-bold mr7">
          <span>{author.name}</span>
        </a>
        <span title={humandate}>{datefrom}</span>
        <i className="octicon-clock" />
      </div>
      <p className="is-semi-bold">{itemTitle}</p>
    </div>
  );
};

Notification.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Notification;
