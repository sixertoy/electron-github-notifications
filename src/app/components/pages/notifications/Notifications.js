import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { retrieveFlux } from '../../../actions';
import Loader from '../../Loader';
import SmallNotification from './SmallNotification';
import MasterNotification from './MasterNotification';
import Scroller from '../../Scroller';

const PER_PAGE = 20;
const START_PAGE = 1;

class Notifications extends React.PureComponent {
  componentDidMount() {
    this.loadMoreNotifications(START_PAGE);
  }

  loadMoreNotifications = page => {
    const { channelid, dispatch } = this.props;
    const config = { page, per_page: PER_PAGE };
    dispatch(retrieveFlux(channelid, config));
  };

  render() {
    const { loading, notifications } = this.props;
    return (
      <div className="is-full-height no-overflow">
        {loading && <Loader />}
        <Scroller
          id="notifications"
          startPage={START_PAGE}
          provider={notifications}
          loadMoreHandler={this.loadMoreNotifications}
          render={obj => {
            const usemaster = !obj.branch || obj.branch === 'master';
            const Component =
              (usemaster && MasterNotification) || SmallNotification;
            return <Component item={obj} />;
          }}
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
