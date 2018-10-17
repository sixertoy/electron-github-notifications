import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ item }) => {
  const {
    author,
    content,
    datefrom,
    humandate,
    icon,
    number,
    title,
    url,
  } = item;
  const itemTitle = title || content;
  // const itemContent = (!title && content !== itemTitle && content) || null;
  return (
    <div className="notification flex-columns">
      <div className="flex-0 mr12">
        <div>
          <i className={`icon-${icon} px5 mr12`} />
        </div>
      </div>
      <div className="flex-1">
        <div>
          <a
            href={author.url}
            className="no-underline is-black-link is-bold fs16 mr7"
          >
            <span>{author.name}</span>
          </a>
          <span className="fs12" title={humandate}>
            {datefrom}
          </span>
          <i className="octicon-clock" />
        </div>
        <div className="flex-columns p12 is-white-background shadow-bl">
          <div className="flex-0 avatar-30 mr12">
            <img src={author.avatar} alt="" />
          </div>
          <div className="flex-1">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="is-black-text no-underline pill is-italic fs12"
            >
              <span>#{number}</span>
            </a>
            <p className="is-semi-bold">{itemTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Notification.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Notification;
