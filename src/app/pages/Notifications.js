/* eslint
  camelcase: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { datetime } from '../helpers';
import { retrieveNotifications } from '../actions';

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

class NotificationsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.actions = bindActionCreators({ retrieveNotifications }, dispatch);
  }

  componentDidMount() {
    this.actions.retrieveNotifications();
  }

  render() {
    const { notifications } = this.props;
    return (
      <div id="notifications-container" className="is-overlay">
        <h2>Notifications</h2>
        <ul>{notifications && notifications.map(renderNotification)}</ul>
      </div>
    );
  }
}

NotificationsPage.propTypes = {
  // repositories: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = ({ notifications, watched }) => ({
  notifications,
  repositories: watched.map(o => o.name),
});

export default connect(mapStateToProps)(NotificationsPage);
