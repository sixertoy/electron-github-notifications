import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { retrieveFlux } from '../../actions';
import Loader from '../../components/Loader';
import Notification from '../../components/Notification';

class Flux extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { page: 1, scrollposition: 0, firstheight: 0 };
    this.fluxScroller = React.createRef();
  }

  componentDidMount() {
    const { current } = this.fluxScroller;
    current.addEventListener('scroll', this.handleScroll);
    this.loadMoreNotifications();
  }

  componentDidUpdate(prevProps) {
    const { firstheight, scrollposition } = this.state;
    const { loading, notifications } = this.props;
    const hasNotificationsChange =
      prevProps.notifications.length !== notifications.length;
    if (loading || !hasNotificationsChange) return;
    const nextposition = scrollposition - firstheight;
    this.scrollToNextPosition(nextposition);
  }

  componentWillUnmount() {
    const { current } = this.fluxScroller;
    current.removeEventListener('scroll', this.handleScroll);
  }

  scrollToNextPosition = position => {
    const { current } = this.fluxScroller;
    const { clientHeight, scrollHeight } = current;
    const nextPosition = scrollHeight - position - clientHeight;
    current.scrollTop = nextPosition;
  };

  handleScroll = () => {
    const { current } = this.fluxScroller;
    const shouldRequest = current.scrollTop <= 0;
    if (!shouldRequest) return;
    const getNextState = prev => {
      const page = prev.page + 1;
      const scrollposition = current.scrollHeight;
      const firstheight = current.firstChild.clientHeight;
      return { firstheight, page, scrollposition };
    };
    this.setState(getNextState, this.loadMoreNotifications);
  };

  loadMoreNotifications = () => {
    const { page } = this.state;
    const { channelid, dispatch } = this.props;
    dispatch(retrieveFlux(channelid, page));
  };

  render() {
    const { loading, notifications } = this.props;
    const items = notifications.map(obj => (
      <Notification key={obj.id} item={obj} />
    ));
    return (
      <React.Fragment>
        {loading && <Loader />}
        <div
          ref={this.fluxScroller}
          id="channel-notifications"
          className="scroll-y is-full-height mr12"
        >
          {items}
        </div>
      </React.Fragment>
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
