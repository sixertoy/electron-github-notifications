import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { retrieveFlux } from '../../actions';
// import Loader from '../../components/Loader';
import Notification from '../../components/Notification';

class Flux extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
    this.fluxScroller = React.createRef();
  }

  componentDidMount() {
    this.loadMoreNotifications();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.state;
    const { loading, notifications } = this.props;
    const hasNotificationsChange =
      !prevProps.notifications.length && notifications.length;
    const isFirstPage = page === 1;
    if (loading || (!hasNotificationsChange && !isFirstPage)) return;
    this.scrollToBottom();
  }

  loadMoreNotifications = () => {
    const { page } = this.state;
    const { channelid, dispatch } = this.props;
    dispatch(retrieveFlux(channelid, page));
  };

  scrollToBottom = () => {
    const { notifications } = this.props;
    const hasNotifications = notifications && notifications.length;
    if (!hasNotifications || !this.fluxScroller) return;
    const { current } = this.fluxScroller;
    current.scrollTop = current.scrollHeight;
  };

  render() {
    const { notifications } = this.props;
    const items = notifications.map(obj => (
      <Notification key={obj.id} item={obj} />
    ));
    return (
      <div
        ref={this.fluxScroller}
        id="channel-notifications"
        className="scroll-y is-full-height mr12"
      >
        {items}
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
