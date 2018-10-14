import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';

import { retrieveReposCommits } from '../../actions/xhr';
import Loader from '../../components/Loader';

class ChannelFlux extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    const actions = { retrieveReposCommits };
    this.actions = bindActionCreators(actions, dispatch);
  }

  componentDidUpdate() {
    const { loading } = this.props;
    if (loading) return;
    this.requestData();
  }

  requestData = () => {
    const { subscribed } = this.props;
    const queries = subscribed.map(obj => {
      const { name, owner } = obj;
      return { owner: owner.login, repo: name };
    });
    this.actions.retrieveReposCommits(queries);
  };

  render() {
    const { loading } = this.props;
    return (
      <div id="flux-cannel">
        {loading && <Loader />}
        {!loading && 'toto'}
      </div>
    );
  }
}

ChannelFlux.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  subscribed: PropTypes.array.isRequired,
};

const mapStateToProps = ({ channels, loading, repositories }, { match }) => {
  const { id } = match.params;
  const channel = channels.find(o => o.id === id);
  const subscribed = repositories.filter(o =>
    channel.repositories.includes(o.id)
  );
  return {
    loading,
    subscribed,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ChannelFlux);
