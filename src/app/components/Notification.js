import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ item }) => {
  const { author, content, humandate, icon, title, url } = item;
  const itemTitle = title || content;
  const itemContent = (!title && content !== itemTitle && content) || null;
  return (
    <div className="notification">
      <div className="flex-columns items-center mb7">
        <span className="badge mr7">
          {icon && <i className={`icon-${icon}`} />}
        </span>
        <span className="fs13">
          <span>{humandate}</span>
        </span>
      </div>
      <div className="flex-columns">
        <div className="avatar flex-0 mr7">
          <img src={author.avatar} alt="" />
        </div>
        <div className="flex-1 content" style={{ maxWidth: '350px' }}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="is-block is-bold"
          >
            <span>{itemTitle}</span>
          </a>
          {itemContent && <div className="">{itemContent}</div>}
        </div>
      </div>
    </div>
  );
};

Notification.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Notification;
