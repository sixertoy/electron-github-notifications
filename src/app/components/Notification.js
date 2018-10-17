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
  const itemContent = (!title && content !== itemTitle && content) || null;
  return (
    <div className="notification flex-columns">
      <div className="flex-0 mr12">
        <div>
          <i className={`icon-${icon} px5 mr12`} />
        </div>
        <div className="avatar-30">
          <img src={author.avatar} alt="" />
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
        <div className="p12 is-white-background shadow-bl">
          <p className="is-italic fs12">#{number}</p>
          <p className="is-semi-bold">{itemTitle}</p>
        </div>
      </div>
      {/*
      <div className="flex-columns items-center mb7">
        <span className="badge mr7">
          {icon && <i className={`icon-${icon}`} />}
        </span>
        <span className="fs13">
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="is-block is-bold"
          >
          </a>
          <span className="is-block">{humandate}</span>
        </span>
      </div>
      <div className="flex-columns">
        <div className="avatar mr7">
          <img src={author.avatar} alt="" />
        </div>
        <div className="flex-1 content" style={{ maxWidth: '350px' }}>
          <span className="is-block">{itemTitle}</span>
          {itemContent && <div className="">{itemContent}</div>}
        </div>
      </div>
      */}
    </div>
  );
};

Notification.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Notification;
