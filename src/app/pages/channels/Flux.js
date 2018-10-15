import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { retrieveFlux } from '../../actions';
import { retrieveRepositories } from '../../actions/xhr';
import Loader from '../../components/Loader';
import Notification from '../../components/Notification';

class Flux extends React.PureComponent {
  componentDidMount() {
    const { dispatch, repositories } = this.props;
    const hasRepositories = repositories && repositories.length > 0;
    if (hasRepositories) return;
    dispatch(retrieveRepositories());
  }

  componentDidUpdate(prevProps) {
    const { channelid, dispatch, loading, repositories } = this.props;
    const hasSameRepositories = repositories === prevProps.repositories;
    const hasSameChannelId = channelid === prevProps.channelid;
    const shouldRequest = !hasSameRepositories || !hasSameChannelId;
    if (loading || !shouldRequest) return;
    dispatch(retrieveFlux(channelid));
  }

  render() {
    const { loading, notifications } = this.props;
    return (
      <div id="flux-channel">
        {loading && <Loader />}
        {!loading && (
          <div className="notifications">
            {notifications.map(obj => (
              <Notification key={obj.id} item={obj} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Flux.propTypes = {
  channelid: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
  repositories: PropTypes.array.isRequired,
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
