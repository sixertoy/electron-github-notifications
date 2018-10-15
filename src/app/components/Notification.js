import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ item }) => {
  const { author, content, date, icon, title, type, url } = item;
  const itemTitle = title || content;
  const itemContent = (!title && content !== itemTitle && content) || null;
  return (
    <div className={`item ${type}-notification`}>
      <div className="flex-0 avatar">
        <img src={author.avatar} alt="" />
      </div>
      <div className="flex-1 content">
        <div className="flex-columns flex-between">
          <span className="is-block">{date}</span>
          {icon && <i className={`icon-${icon}`} />}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="is-block is-bold"
        >
          <span>{itemTitle}</span>
        </a>
        {itemContent && <p className="is-block is-bold">{itemContent}</p>}
      </div>
    </div>
  );
};

Notification.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Notification;
