/* eslint
  camelcase: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { datetime } from '../helpers';
import { retrieveNotifications } from '../actions/xhr';
import Repositories from '../components/Repositories';

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
    const actions = { retrieveNotifications };
    this.actions = bindActionCreators(actions, dispatch);
  }

  componentDidMount() {
    this.actions.retrieveNotifications();
  }

  render() {
    const { notifications, subscriptions } = this.props;
    // si aucun abonnement à un repository
    // on retourne sur la vue settings
    if (!subscriptions || !subscriptions.length)
      return <Redirect to="/settings" />;
    return (
      <div id="notifications-container" className="">
        <h2>Notifications</h2>
        <ul>{notifications && notifications.map(renderNotification)}</ul>
        <Repositories />
      </div>
    );
  }
}

NotificationsPage.propTypes = {
  // repositories: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
  subscriptions: PropTypes.array.isRequired,
};

const mapStateToProps = ({ notifications, subscriptions, watched }) => ({
  notifications,
  repositories: watched.map(o => o.name),
  subscriptions,
});

export default connect(mapStateToProps)(NotificationsPage);
