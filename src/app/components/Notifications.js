/* eslint
  camelcase: 0
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { datetime } from '../helpers';

const renderNotification = obj => {
  const {
    id,
    url,
    // reason,
    updated_at,
    repository: { name: repo },
    subject: { title, type },
  } = obj;
  return (
    <li key={id} className="flex-rows notification">
      <span className="flex-columns">
        <span className="date">{datetime(updated_at)}</span>
        <span>{repo}</span>
        <span className={`reason-${type.toLowerCase()}`} />
      </span>
      <a className="title" href={url} target="_blank" rel="noopener noreferrer">
        <span>{title}</span>
      </a>
      {/* <span>{reason}</span> */}
    </li>
  );
};

const Notifications = ({ notifications }) => (
  <div>
    <h2>Notifications</h2>
    <ul>{notifications && notifications.map(renderNotification)}</ul>
  </div>
);

Notifications.propTypes = {
  // repositories: PropTypes.array.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = ({ notifications, watched }) => ({
  notifications,
  repositories: watched.map(o => o.name),
});

export default connect(mapStateToProps)(Notifications);
