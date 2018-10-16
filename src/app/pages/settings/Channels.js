import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Channels = ({ channels }) => {
  console.log('channels', channels);
  return <div />;
};

Channels.defaultProps = {};

Channels.propTypes = {
  channels: PropTypes.array.isRequired,
};

const mapStateToProps = ({ channels }) => ({ channels });

export default connect(mapStateToProps)(Channels);
