import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../Loader';

class FluxChannel extends React.PureComponent {
  componentDidMount() {}

  render() {
    const { loading, subscribed } = this.props;
    console.log('subscribed', subscribed);
    return (
      <div id="flux-cannel">
        {loading && <Loader />}
        {!loading && 'toto'}
      </div>
    );
  }
}

FluxChannel.propTypes = {
  loading: PropTypes.bool.isRequired,
  subscribed: PropTypes.array.isRequired,
};

const mapStateToProps = ({ channels, loading, repositories }, { match }) => {
  const { id } = match.params;
  const channel = channels.find(o => o.id === id);
  const subscribed = repositories.filter(o =>
    channel.repositories.includes(o.id)
  );
  console.log('subscribed', subscribed);
  return {
    loading,
    subscribed,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(FluxChannel);
