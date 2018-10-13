import React from 'react';
import PropTypes from 'prop-types';

const FluxChannel = ({ channel }) => <div id="flux-cannel">{channel}</div>;

FluxChannel.propTypes = {
  channel: PropTypes.string.isRequired,
};

export default FluxChannel;
