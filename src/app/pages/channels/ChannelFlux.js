import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';

import { retrieveFlux } from '../../actions';
import { retrieveUserRepositories } from '../../actions/xhr';
import Loader from '../../components/Loader';
import Notification from '../../components/Notification';

class ChannelFlux extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    const actions = { retrieveFlux, retrieveUserRepositories };
    this.actions = bindActionCreators(actions, dispatch);
  }

  componentDidMount() {
    const { repositories } = this.props;
    const hasRepositories = repositories && repositories.length > 0;
    if (hasRepositories) return;
    this.actions.retrieveUserRepositories();
  }

  componentDidUpdate(prevProps) {
    const { channelid, loading, repositories } = this.props;
    const hasSameRepositories = repositories === prevProps.repositories;
    const hasSameChannelId = channelid === prevProps.channelid;
    const shouldRequest = !hasSameRepositories || !hasSameChannelId;
    if (loading || !shouldRequest) return;
    this.actions.retrieveFlux(channelid);
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

ChannelFlux.propTypes = {
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
)(ChannelFlux);
