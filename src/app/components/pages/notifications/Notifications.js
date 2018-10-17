import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { retrieveFlux } from '../../../actions';
import Loader from '../../Loader';
import Notification from '../../Notification';
import Scroller from '../../Scroller';

class Notifications extends React.PureComponent {
  componentDidMount() {
    this.loadMoreNotifications();
  }

  loadMoreNotifications = (page = 1) => {
    const { channelid, dispatch } = this.props;
    dispatch(retrieveFlux(channelid, page));
  };

  render() {
    const { loading, notifications } = this.props;
    return (
      <div id="channel-notifications" className="flex-1 mb30">
        {loading && <Loader />}
        <Scroller
          provider={notifications}
          className="is-full-height scroll-y"
          loadMoreHandler={this.loadMoreNotifications}
          render={obj => <Notification key={obj.id} item={obj} />}
        />
      </div>
    );
  }
}

Notifications.propTypes = {
  channelid: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state, { match }) => {
  const { loading, notifications, repositories } = state;
  const { id } = match.params;
  return {
    channelid: id,
    loading,
    notifications,
    repositories,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Notifications);
