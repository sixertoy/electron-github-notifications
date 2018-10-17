import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { retrieveFlux } from '../../actions';
import Loader from '../../components/Loader';
import FluxScroller from '../../components/FluxScroller';
import Notification from '../../components/Notification';

class Flux extends React.PureComponent {
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
      <div className="flex-1">
        {loading && <Loader />}
        <FluxScroller
          provider={notifications}
          id="channel-notifications"
          className="scroll-y is-full-height mr12"
          loadMoreHandler={this.loadMoreNotifications}
          render={obj => <Notification key={obj.id} item={obj} />}
        />
      </div>
    );
  }
}

Flux.propTypes = {
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
)(Flux);
